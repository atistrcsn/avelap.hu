#!/usr/bin/env node
/**
 * Cloudinary → Cloudflare R2 migration script
 * Zero npm deps: uses fetch (Node 22), wrangler CLI, psql CLI
 *
 * Run from apps/api:
 *   cd apps/api && node migrate-cloudinary-to-r2.mjs
 *
 * Required env vars (injected via bws run):
 *   DATABASE_URL, R2_BUCKET, R2_PUBLIC_URL
 *   CLOUDFLARE_API_TOKEN + CLOUDFLARE_ACCOUNT_ID (used by wrangler)
 *   DRY_RUN=true  — log only, no writes
 */

import { execSync } from "child_process";
import { writeFileSync, unlinkSync } from "fs";
import { tmpdir } from "os";
import { join } from "path";

const { DATABASE_URL, R2_BUCKET, R2_PUBLIC_URL, DRY_RUN = "false" } =
  process.env;

for (const key of ["DATABASE_URL", "R2_BUCKET", "R2_PUBLIC_URL"]) {
  if (!process.env[key]) {
    console.error(`❌  Missing required env var: ${key}`);
    process.exit(1);
  }
}

const isDryRun = DRY_RUN === "true";
if (isDryRun) console.log("🔍  DRY RUN — no writes will be performed\n");

// ── DB helpers (via psql) ─────────────────────────────────────────────────────
function psql(sql) {
  const result = execSync(
    `psql "${DATABASE_URL}" -t -A -F '|' -c ${JSON.stringify(sql)}`,
    { encoding: "utf8" }
  );
  return result.trim();
}

function psqlExec(sql) {
  if (isDryRun) {
    console.log(`    [DRY] SQL: ${sql.trim().slice(0, 120)}...`);
    return;
  }
  // Write to temp file to avoid shell quoting issues with multiline SQL
  const tmp = join(tmpdir(), `migration_${Date.now()}.sql`);
  try {
    writeFileSync(tmp, sql);
    execSync(`psql "${DATABASE_URL}" -f "${tmp}"`, { stdio: "inherit" });
  } finally {
    try { unlinkSync(tmp); } catch {}
  }
}

// ── R2 upload (via wrangler) ──────────────────────────────────────────────────
function r2Upload(localPath, key) {
  if (isDryRun) {
    console.log(`    [DRY] pnpm exec wrangler r2 object put ${R2_BUCKET}/${key}`);
    return;
  }
  execSync(
    `pnpm exec wrangler r2 object put "${R2_BUCKET}/${key}" --file="${localPath}" --remote --jurisdiction eu`,
    { stdio: "inherit" }
  );
}

function r2Exists(key) {
  try {
    execSync(
      `pnpm exec wrangler r2 object head "${R2_BUCKET}/${key}" --remote --jurisdiction eu 2>/dev/null`,
      { stdio: "ignore" }
    );
    return true;
  } catch {
    return false;
  }
}

// ── Download helper ───────────────────────────────────────────────────────────
async function download(url) {
  console.log(`    ⬇️   ${url}`);
  const res = await fetch(url);
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  return Buffer.from(await res.arrayBuffer());
}

// ── Upload one file to R2 ─────────────────────────────────────────────────────
async function uploadToR2(url, key) {
  if (!isDryRun && r2Exists(key)) {
    console.log(`    ⏭   Already in R2: ${key}`);
    return `${R2_PUBLIC_URL}/${key}`;
  }

  const buf = await download(url);
  const tmp = join(tmpdir(), key.replace(/\//g, "_"));

  try {
    if (!isDryRun) writeFileSync(tmp, buf);
    console.log(`    ⬆️   ${key} (${buf.length} bytes)`);
    r2Upload(tmp, key);
  } finally {
    try { if (!isDryRun) unlinkSync(tmp); } catch {}
  }

  return `${R2_PUBLIC_URL}/${key}`;
}

// ── Main ──────────────────────────────────────────────────────────────────────
async function main() {
  const raw = psql(
    "SELECT id, hash, ext, url, mime, formats::text FROM public.files WHERE provider = 'cloudinary' ORDER BY id"
  );

  if (!raw) { console.log("No Cloudinary files found."); return; }

  const rows = raw.split("\n").filter(Boolean).map((line) => {
    const [id, hash, ext, url, mime, formatsRaw] = line.split("|");
    return {
      id,
      hash,
      ext,
      url,
      mime,
      formats: formatsRaw && formatsRaw !== "" ? JSON.parse(formatsRaw) : null,
    };
  });

  console.log(`Found ${rows.length} Cloudinary files\n`);

  let ok = 0, failed = 0;

  for (const row of rows) {
    console.log(`\n[${row.id}] ${row.hash}${row.ext}`);

    // Main file
    const mainKey = `${row.hash}${row.ext}`;
    let newUrl;
    try {
      newUrl = await uploadToR2(row.url, mainKey);
    } catch (err) {
      console.error(`    ❌  Main: ${err.message}`);
      failed++;
      continue;
    }

    // Format variants
    let newFormatsJson = "NULL";
    if (row.formats) {
      const updated = { ...row.formats };
      for (const [name, data] of Object.entries(row.formats)) {
        if (!data?.url) continue;
        const variantKey = `${name}_${row.hash}${row.ext}`;
        try {
          updated[name] = { ...data, url: await uploadToR2(data.url, variantKey) };
        } catch (err) {
          console.error(`    ❌  Variant "${name}": ${err.message}`);
        }
      }
      newFormatsJson = `'${JSON.stringify(updated).replace(/'/g, "''")}'`;
    }

    // Update DB
    const escapedUrl = newUrl.replace(/'/g, "''");
    psqlExec(`
      UPDATE public.files SET
        url               = '${escapedUrl}',
        formats           = ${newFormatsJson},
        provider          = '@strapi/provider-upload-aws-s3',
        provider_metadata = NULL
      WHERE id = ${row.id}
    `);

    if (!isDryRun) console.log(`    ✅  DB updated → ${newUrl}`);
    else console.log(`    [DRY] Would update DB → ${newUrl}`);
    ok++;
  }

  console.log(`\n${"─".repeat(60)}`);
  console.log(`Done: ${ok} ok, ${failed} failed`);
  const remaining = psql("SELECT COUNT(*) FROM public.files WHERE provider = 'cloudinary'");
  console.log(`Remaining Cloudinary files: ${remaining}`);
}

main().catch((err) => { console.error("Fatal:", err); process.exit(1); });
