import { request } from '@playwright/test';
import { testTargets } from '../../test-targets.config';

const localApiBaseUrl = testTargets.pethubLocal.apiBaseUrl ?? 'http://127.0.0.1:3000/api/';

/**
 * Resets the local PetHub database before the run, so state left by a previous
 * run cannot leak into fresh assertions.
 *
 * Fatal on failure, not best-effort: asserting against unknown state produces
 * failures that look like locator or timing bugs. Relies on the webServer
 * already being up (Playwright starts it before globalSetup).
 */
async function globalSetup(): Promise<void> {
  const context = await request.newContext({ baseURL: localApiBaseUrl });

  try {
    const response = await context.post('admin/reset', { timeout: 10_000 });

    if (!response.ok()) {
      throw new Error(`HTTP ${response.status()}`);
    }
  } catch (error) {
    const reason = error instanceof Error ? error.message : String(error);

    throw new Error(
      `[globalSetup] Reset at ${localApiBaseUrl} failed (${reason}). Aborting: a run must start from the canonical seed.`,
      { cause: error },
    );
  } finally {
    await context.dispose();
  }
}

export default globalSetup;
