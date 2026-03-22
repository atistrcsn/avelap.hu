/**
 * Strapi application entry point.
 *
 * Required environment variables for GitHub deploy webhook:
 *   GITHUB_PAT          — Personal Access Token with repo:write / workflow scope
 *   GITHUB_REPO_OWNER   — GitHub organisation or user that owns the repository
 *   GITHUB_REPO_NAME    — Repository name (e.g. avelap-monorepo)
 */

// ─── Slug generation ──────────────────────────────────────────────────────────

/** Content types that receive auto-generated slugs from their `title` field. */
const SLUG_TYPES = new Set(['api::event.event', 'api::eventtype.eventtype']);
const SLUG_ACTIONS = new Set(['create', 'update']);

/**
 * Convert a Hungarian (or general Latin) title into a URL-safe slug.
 * Handles accented characters without any external dependency.
 */
function toSlug(text: string): string {
  return text
    .toLowerCase()
    .replace(/á/g, 'a').replace(/é/g, 'e').replace(/í/g, 'i')
    .replace(/ó/g, 'o').replace(/ö/g, 'o').replace(/ő/g, 'o')
    .replace(/ú/g, 'u').replace(/ü/g, 'u').replace(/ű/g, 'u')
    .replace(/[^a-z0-9\s-]/g, '')
    .trim()
    .replace(/[\s_]+/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '');
}

/**
 * Generate a unique slug for the given content type.
 * Appends a numeric suffix (-1, -2, …) when the base slug already exists,
 * excluding the current document so updates don't conflict with themselves.
 */
async function generateUniqueSlug(
  strapiInstance: any,
  uid: string,
  title: string,
  currentDocumentId?: string,
): Promise<string> {
  const base = toSlug(title);
  if (!base) return '';

  const existing: Array<{ slug: string; documentId: string }> =
    await strapiInstance.documents(uid).findMany({
      filters: { slug: { $startsWith: base } },
      fields: ['slug', 'documentId'],
      status: 'draft',
      limit: 100,
    });

  const taken = new Set(
    existing
      .filter((doc) => doc.documentId !== currentDocumentId)
      .map((doc) => doc.slug),
  );

  if (!taken.has(base)) return base;

  let n = 1;
  while (taken.has(`${base}-${n}`)) n++;
  return `${base}-${n}`;
}

// ─── Deploy webhook ────────────────────────────────────────────────────────────

/** Actions that indicate meaningful content changes and should trigger a rebuild. */
const DEPLOY_ACTIONS = new Set(['create', 'update', 'delete', 'publish', 'unpublish']);

/**
 * Fire a GitHub repository_dispatch event so the CI/CD pipeline rebuilds
 * and deploys the Next.js frontend after content changes in Strapi.
 *
 * Errors are caught and logged — a webhook failure must never crash Strapi.
 */
async function triggerDeploy(strapi: { log: { error: (...args: unknown[]) => void } }): Promise<void> {
  const owner = process.env.GITHUB_REPO_OWNER;
  const repo = process.env.GITHUB_REPO_NAME;
  const pat = process.env.GITHUB_PAT;

  if (!owner || !repo || !pat) {
    // Silently skip when credentials are not configured (e.g. local dev without .env).
    return;
  }

  try {
    const response = await fetch(
      `https://api.github.com/repos/${owner}/${repo}/dispatches`,
      {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${pat}`,
          Accept: 'application/vnd.github+json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ event_type: 'strapi-content-change' }),
      },
    );

    if (!response.ok) {
      const text = await response.text();
      strapi.log.error(
        `[deploy-hook] GitHub dispatch failed: ${response.status} ${response.statusText} — ${text}`,
      );
    }
  } catch (err) {
    // Network or JSON serialisation errors should not propagate to callers.
    strapi.log.error('[deploy-hook] Unexpected error triggering GitHub dispatch:', err);
  }
}

// ─── App registration ──────────────────────────────────────────────────────────

export default {
  /**
   * Register phase — runs before the application is initialised.
   * We attach a global document service middleware here so it covers every
   * content type without needing per-type lifecycle files.
   */
  register({ strapi }: { strapi: any }) {
    strapi.documents.use(async (context: { uid: string; action: string; params: any; documentId?: string }, next: () => Promise<unknown>) => {

      // ── Slug auto-generation (runs BEFORE the operation) ──────────────────
      if (SLUG_TYPES.has(context.uid) && SLUG_ACTIONS.has(context.action)) {
        const data = context.params?.data;
        // Only generate when a title is present and slug was not manually provided
        if (data?.title && !data.slug) {
          data.slug = await generateUniqueSlug(
            strapi,
            context.uid,
            data.title,
            context.documentId,
          );
        }
      }

      // ── Execute the original operation ────────────────────────────────────
      let result: unknown;
      try {
        result = await next();
      } catch (err) {
        // Re-throw so Strapi's error handling pipeline is not bypassed.
        throw err;
      }

      // ── Deploy webhook (runs AFTER the operation completes) ───────────────
      if (DEPLOY_ACTIONS.has(context.action)) {
        // Fire-and-forget: we await so errors are logged in this request cycle,
        // but we never throw to the caller.
        await triggerDeploy(strapi);
      }

      return result;
    });
  },

  /**
   * Bootstrap phase — runs after the application has been initialised but
   * before it starts serving requests.
   */
  bootstrap(/*{ strapi }*/) {},
};
