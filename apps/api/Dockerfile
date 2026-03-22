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
COPY package.json pnpm-workspace.yaml pnpm-lock.yaml ./
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
COPY package.json pnpm-workspace.yaml pnpm-lock.yaml ./
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
FROM node:22-alpine AS runner

RUN corepack enable && corepack prepare pnpm@10.25.0 --activate

RUN addgroup --system --gid 1001 nodejs \
 && adduser  --system --uid 1001 strapi

WORKDIR /app

# Workspace manifests are required so pnpm can resolve the @avelap/api package
# correctly when running `pnpm install --prod` inside the container.
COPY package.json pnpm-workspace.yaml pnpm-lock.yaml ./
COPY apps/api/package.json ./apps/api/package.json

# Install only production dependencies (skips devDependencies including
# better-sqlite3, vite, babel-loader, and TypeScript tooling).
RUN pnpm install --frozen-lockfile --prod --filter @avelap/api...

# Copy runtime source and built artifacts from the builder stage.
# database/ is intentionally omitted: production uses PostgreSQL (no local DB
# directory needed) and Strapi will create it on first run if SQLite is used.
COPY --from=builder /app/apps/api/src       ./apps/api/src
COPY --from=builder /app/apps/api/config    ./apps/api/config
COPY --from=builder /app/apps/api/dist      ./apps/api/dist
COPY --from=builder /app/apps/api/public    ./apps/api/public

RUN chown -R strapi:nodejs /app

USER strapi

ENV NODE_ENV=production

WORKDIR /app/apps/api

EXPOSE 1337

CMD ["pnpm", "start"]
