/**
 * Strapi application entry point.
 *
 * Required environment variables for GitHub deploy webhook:
 *   GITHUB_PAT          — Personal Access Token with repo:write / workflow scope
 *   GITHUB_REPO_OWNER   — GitHub organisation or user that owns the repository
 *   GITHUB_REPO_NAME    — Repository name (e.g. avelap-monorepo)
 */

// Actions that indicate meaningful content changes and should trigger a rebuild.
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

export default {
  /**
   * Register phase — runs before the application is initialised.
   * We attach a global document service middleware here so it covers every
   * content type without needing per-type lifecycle files.
   */
  register({ strapi }: { strapi: Parameters<typeof triggerDeploy>[0] & { documents: { use: Function } } }) {
    strapi.documents.use(async (context: { action: string }, next: () => Promise<unknown>) => {
      // Always let the original action complete first.
      // Re-throw so Strapi's error handling pipeline is not bypassed.
      let result: unknown;
      try {
        result = await next();
      } catch (err) {
        throw err;
      }

      if (DEPLOY_ACTIONS.has(context.action)) {
        // Fire-and-forget: we await the call so errors are logged synchronously
        // within this request cycle, but we never throw to the caller.
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
