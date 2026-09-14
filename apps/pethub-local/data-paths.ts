import { existsSync, mkdirSync } from 'node:fs';
import { join } from 'node:path';

/**
 * Directory that holds the three lowdb JSON stores - the operational database,
 * the CQRS-style read models, and the downstream replicas.
 *
 * Defaults to `apps/pethub-local/data`, resolved relative to this module so the
 * app runs from any working directory. Setting `PETHUB_DATA_DIR` redirects all
 * three stores to a scratch directory instead, which is what lets two runs
 * share one machine without writing the same JSON files - for example two
 * agents working in separate worktrees, or a test suite running alongside a
 * manual `npm run app:start`.
 *
 * An unset *or empty* value falls back to the default, so a blank
 * `PETHUB_DATA_DIR=` (as shipped in `.env.example`) can never resolve to a
 * relative path.
 */
const configuredDataDirectory = process.env.PETHUB_DATA_DIR?.trim();
const dataDirectory = configuredDataDirectory ? configuredDataDirectory : join(__dirname, 'data');

/**
 * Absolute path to one of the lowdb store files. Creates the containing
 * directory on first use so an externally supplied `PETHUB_DATA_DIR` does not
 * need to exist beforehand.
 */
export const resolveDataFile = (fileName: string): string => {
  if (!existsSync(dataDirectory)) {
    mkdirSync(dataDirectory, { recursive: true });
  }

  return join(dataDirectory, fileName);
};
