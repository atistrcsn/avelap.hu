# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Avelap.hu — a Hungarian community/church website with events, teachings, testimonials, FAQs, and contact info. The monorepo contains a **Strapi 5 headless CMS** backend and a **Next.js 16** frontend.

## Monorepo Structure

- **Tooling:** NX 22 + pnpm 10 workspaces
- **Packages:** `apps/*` only (no separate `libs/` directory)
- **Apps:**
  - `apps/api` — `@avelap/api` — Strapi 5.31 backend (React 18, PostgreSQL)
  - `apps/web` — `@avelap/web` — Next.js 16 frontend (React 19, Tailwind CSS 4, TanStack Query 5)

## Commands

### Root level
```bash
pnpm build          # NX builds Next.js app (nx next:build)
pnpm lint           # NX runs ESLint (nx eslint:lint)
```

### API (apps/api)
```bash
cd apps/api
pnpm develop        # Start Strapi dev server (port 1337)
pnpm build          # Build Strapi admin + extensions
pnpm start          # Start production server
pnpm seed           # Import seed data from ../seed-data.tar.gz
pnpm export         # Export seed data
pnpm cfgsync        # Sync Strapi config
```

### Web (apps/web)
```bash
cd apps/web
pnpm develop        # Start Next.js dev server (custom start-dev.mjs)
pnpm build          # Production build (Turbopack)
pnpm start          # Serve on port 8080
pnpm lint           # ESLint
pnpm clear          # Remove .next and cache dirs
pnpm copytypes      # Copy Strapi types to frontend
```

### NX affected commands (CI uses these)
```bash
pnpm nx affected --target=build --parallel=3
pnpm nx affected --target=lint
```

## Architecture

### React version split
The API (Strapi admin) requires **React 18** (pinned via pnpm overrides in `apps/api/package.json`). The web app uses **React 19** (via pnpm catalog `react19`). These are managed through `pnpm-workspace.yaml` catalogs — do not change React versions without understanding this constraint.

### API content types (`apps/api/src/api/`)
Each directory has the standard Strapi structure: `controllers/`, `routes/`, `services/`, `content-types/`.

| Content type | Description |
|---|---|
| `event` | Events (auto-slugified) |
| `eventtype` | Event categories (auto-slugified) |
| `gyakori-kerdes` | FAQs |
| `hasznos-cimek-oldal` | Useful links page |
| `kapcsolat-oldal` | Contact page |
| `quote` | Testimonial quotes |
| `setting` | Site-wide settings |
| `tanitas` | Teachings/articles |
| `tanusagtetel` | Testimonials/stories |

### Strapi plugins (configured in `apps/api/config/plugins.ts`)
- **Cloudflare R2** upload provider via `@strapi/provider-upload-aws-s3` (S3-compatible, requires `R2_ACCESS_KEY_ID`, `R2_ACCESS_SECRET`, `R2_BUCKET`, `R2_ENDPOINT`, `R2_PUBLIC_URL`)
- **SEO** — `@strapi-community/plugin-seo`
- **Slugify** — auto-generates slugs for events and eventtypes
- **Video field** — `@sklinet/strapi-plugin-video-field`
- **Drag & drop** — content type ordering
- **Config sync** — `strapi-plugin-config-sync`

### Frontend routing (`apps/web/src/app/`)
Uses Next.js App Router. All subpages are in a `(subpages)` route group with a shared layout:
`esemenyek`, `hasznos-cimek`, `kapcsolat`, `kik-vagyunk`, `programjaink`, `tanitasok`, `tanusagtetelek`

### Key frontend patterns
- **Data fetching:** TanStack Query with `@tanstack/react-query-next-experimental`
- **Strapi client:** `@strapi/client` for API communication
- **Styling:** Tailwind CSS 4 + `clsx` + `tailwind-merge`
- **UI primitives:** Radix UI (accordion, dialog)
- **Maps:** `@react-google-maps/api`
- **Path alias:** `@/*` → `src/*` (configured in `tsconfig.json`)
- **Output mode:** Fully static (`output: 'export'` in `next.config.ts`) — no server runtime; deployed to Cloudflare Pages

### Database
- **Production:** PostgreSQL (configurable via `DATABASE_*` env vars)
- **Dev fallback:** SQLite (default when `DATABASE_CLIENT` is unset)
- Docker Compose files available in `.devcontainer/` and `/postgresql/`

### Environment variables
- `API_BASEURL` — Strapi API URL for the frontend
- `GOOGLETAG_ID` — Google Tag Manager
- `DATABASE_CLIENT` — `postgres` | `mysql` | `sqlite` (defaults to `sqlite`)
- `DATABASE_HOST`, `DATABASE_PORT`, `DATABASE_NAME`, `DATABASE_USERNAME`, `DATABASE_PASSWORD`
- `R2_ACCESS_KEY_ID`, `R2_ACCESS_SECRET` — Cloudflare R2 credentials
- `R2_BUCKET` — R2 bucket name
- `R2_ENDPOINT` — R2 S3-compatible endpoint URL
- `R2_PUBLIC_URL` — Public base URL for served R2 assets

Secrets are managed via **Bitwarden Secrets Manager** (`bitwarden/sm-action@v3`). Only `BW_ACCESS_TOKEN` is stored as a GitHub secret; all other secrets are injected at deploy time.

### Images / Upload provider
Upload provider: `@strapi/provider-upload-aws-s3` configured for **Cloudflare R2** (S3-compatible). Media files are stored in R2 and served via the `R2_PUBLIC_URL` domain.

Remote image patterns configured in `next.config.ts`: `localhost:1337`, R2 public domain (set via `R2_PUBLIC_URL`), `source.unsplash.com`, `raw.githubusercontent.com`

## CI/CD

### Workflows
- **`.github/workflows/ci.yml`** — Lint and build check on PRs and push to `main` (NX affected)
- **`.github/workflows/deploy.yml`** — Production deployment; triggers on:
  - Push to `main`
  - `repository_dispatch` event with type `strapi-content-change` (fired by Strapi lifecycle hook when content is published)

### Deployment targets
- **API → Koyeb**: Dockerized Node 22 Alpine image, scale-to-zero enabled, Neon PostgreSQL as managed database
- **Web → Cloudflare Pages**: Fully static export (`output: 'export'`), project name `avelap-hu`

### Secrets management
All secrets are stored in **Bitwarden Secrets Manager** and injected at deploy time via `bitwarden/sm-action@v3`. The only GitHub secret required is `BW_ACCESS_TOKEN`.

### Content rebuild webhook
A Strapi lifecycle hook fires a GitHub `repository_dispatch` (`strapi-content-change`) on content publish events, triggering a fresh static build and deploy of the web app.

## Development Setup

1. `pnpm install` at root
2. Start PostgreSQL (Docker or local) or use SQLite default
3. `cd apps/api && pnpm develop` — Strapi on `:1337`
4. `cd apps/web && pnpm develop` — Next.js dev server

A devcontainer config is available in `.devcontainer/` with PostgreSQL 16 and Node 20.

## Content language
All user-facing content is in **Hungarian**. Content type names, route slugs, and UI copy use Hungarian. Keep this convention when adding new content types or routes.
