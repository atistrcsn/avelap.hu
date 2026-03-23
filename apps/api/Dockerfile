# ─── Stage 1: deps ────────────────────────────────────────────────────────────
# Install ALL dependencies (including devDeps) so the build step has TypeScript
# compilers, vite, and other build-time tools available.
FROM node:22-alpine AS deps

# corepack ships with Node 22; enable it to get the exact pnpm version pinned in
# the root package.json so lock-file resolution is consistent.
RUN corepack enable && corepack prepare pnpm@10.25.0 --activate

WORKDIR /app

# Copy workspace manifests first so Docker layer caching skips re-install when
# only source files change.
COPY package.json pnpm-workspace.yaml pnpm-lock.yaml .npmrc ./
COPY apps/api/package.json ./apps/api/package.json

# Install all deps (dev + prod) for the api workspace.
# --frozen-lockfile ensures reproducible installs in CI/CD.
RUN pnpm install --frozen-lockfile --filter @avelap/api...


# ─── Stage 2: builder ─────────────────────────────────────────────────────────
# Compile TypeScript source and build the Strapi admin UI bundle.
FROM node:22-alpine AS builder

RUN corepack enable && corepack prepare pnpm@10.25.0 --activate

WORKDIR /app

# Bring workspace manifests and the full dep tree from the deps stage.
COPY package.json pnpm-workspace.yaml pnpm-lock.yaml .npmrc ./
COPY apps/api/package.json ./apps/api/package.json
COPY --from=deps /app/node_modules ./node_modules
COPY --from=deps /app/apps/api/node_modules ./apps/api/node_modules

# Copy the full API source so `strapi build` can read config/, src/, public/, etc.
COPY apps/api/ ./apps/api/

WORKDIR /app/apps/api

ENV NODE_ENV=production

# Build Strapi admin UI + compile TypeScript extensions into dist/.
RUN pnpm build


# ─── Stage 3: runner ──────────────────────────────────────────────────────────
# Lean production image: only runtime artifacts and production dependencies.
# better-sqlite3 lives in devDependencies so --prod naturally excludes it.
#
# Two processes run via supervisord:
#   1. cloudflared — outbound Cloudflare Tunnel (no exposed port needed)
#   2. strapi start — Strapi API on localhost:1337
FROM node:22-alpine AS runner

RUN corepack enable && corepack prepare pnpm@10.25.0 --activate

# supervisor: manages both cloudflared and strapi processes
# curl + unzip: needed to download cloudflared and bws binaries
RUN apk add --no-cache supervisor curl unzip

# cloudflared: statically linked, works on Alpine (musl).
ARG CLOUDFLARED_VERSION=2026.3.0
RUN curl -fsSL "https://github.com/cloudflare/cloudflared/releases/download/${CLOUDFLARED_VERSION}/cloudflared-linux-amd64" \
    -o /usr/local/bin/cloudflared \
 && chmod +x /usr/local/bin/cloudflared

# bws: Bitwarden Secrets Manager CLI (musl build — Alpine compatible).
# Injects all secrets at container startup; Koyeb only needs BWS_ACCESS_TOKEN.
ARG BWS_VERSION=2.0.0
RUN curl -fsSL "https://github.com/bitwarden/sdk-sm/releases/download/bws-v${BWS_VERSION}/bws-x86_64-unknown-linux-musl-${BWS_VERSION}.zip" \
    -o /tmp/bws.zip \
 && unzip -p /tmp/bws.zip bws > /usr/local/bin/bws \
 && chmod +x /usr/local/bin/bws \
 && rm /tmp/bws.zip

RUN addgroup --system --gid 1001 nodejs \
 && adduser  --system --uid 1001 strapi

WORKDIR /app

# Workspace manifests are required so pnpm can resolve the @avelap/api package
# correctly when running `pnpm install --prod` inside the container.
COPY package.json pnpm-workspace.yaml pnpm-lock.yaml .npmrc ./
COPY apps/api/package.json ./apps/api/package.json

# Install only production dependencies (skips devDependencies including
# better-sqlite3, vite, babel-loader, and TypeScript tooling).
RUN pnpm install --frozen-lockfile --prod --filter @avelap/api...

# Copy runtime source and built artifacts from the builder stage.
# database/ is intentionally omitted: production uses PostgreSQL (no local DB
# directory needed) and Strapi will create it on first run if SQLite is used.
COPY --from=builder /app/apps/api/tsconfig.json ./apps/api/tsconfig.json
COPY --from=builder /app/apps/api/src       ./apps/api/src
COPY --from=builder /app/apps/api/config    ./apps/api/config
COPY --from=builder /app/apps/api/dist      ./apps/api/dist
COPY --from=builder /app/apps/api/public    ./apps/api/public

# supervisord config — copied before chown so strapi user can read it
COPY apps/api/supervisord.conf /etc/supervisord.conf

# Pre-create runtime directories Strapi writes to at startup.
RUN mkdir -p /app/apps/api/.strapi /app/apps/api/.tmp /app/apps/api/database/migrations

# Only chown app source + runtime dirs — node_modules stays root-owned
# (read-only is fine). Avoids a 2+ minute recursive chown over tens of
# thousands of files.
RUN chown -R strapi:nodejs /app/apps/api/src \
                           /app/apps/api/config \
                           /app/apps/api/dist \
                           /app/apps/api/public \
                           /app/apps/api/.strapi \
                           /app/apps/api/.tmp \
                           /app/apps/api/database

USER strapi

ENV NODE_ENV=production
ENV DATABASE_CLIENT=postgres
ENV BWS_PROJECT_ID=1c33f458-ac81-4977-a067-b41500a4e5b0

WORKDIR /app/apps/api

# No EXPOSE: traffic enters exclusively via Cloudflare Tunnel (outbound only).
# Shell form is required here so $BWS_PROJECT_ID is expanded at runtime.
CMD bws run --project-id "$BWS_PROJECT_ID" -- supervisord -c /etc/supervisord.conf
