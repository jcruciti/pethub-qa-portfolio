import { existsSync, readdirSync, readFileSync } from 'node:fs';
import { dirname, join, relative, resolve } from 'node:path';

/**
 * Checks that every relative link in the repository's Markdown points at a file
 * that exists.
 *
 * The docs cross-reference each other and the source tree heavily, and renames
 * have repeatedly left stale targets behind (`tests/dev/`, `.windsurf/`), so the
 * targets are verified rather than trusted.
 *
 * Scope is deliberately narrow: external URLs are ignored, and in-page anchors
 * are not resolved because GitHub's heading slugification cannot be reproduced
 * faithfully - a checker that reports false positives gets switched off.
 */

const repoRoot = resolve(__dirname, '..');

const ignoredDirectories = new Set([
  '.git',
  'node_modules',
  'dist',
  'coverage',
  'blob-report',
  'playwright-report',
  'playwright-report-local',
  'test-results',
  'test-results-local',
]);

const markdownLinkPattern = /\[[^\]]*\]\(([^)]+)\)/g;
const externalTargetPattern = /^(?:[a-z][a-z0-9+.-]*:|\/\/)/i;

type BrokenLink = {
  file: string;
  line: number;
  target: string;
};

const collectMarkdownFiles = (directory: string): string[] => {
  const found: string[] = [];

  for (const entry of readdirSync(directory, { withFileTypes: true })) {
    if (entry.isDirectory()) {
      if (!ignoredDirectories.has(entry.name)) {
        found.push(...collectMarkdownFiles(join(directory, entry.name)));
      }
      continue;
    }

    if (entry.name.endsWith('.md')) {
      found.push(join(directory, entry.name));
    }
  }

  return found;
};

const findBrokenLinks = (file: string): BrokenLink[] => {
  const contents = readFileSync(file, 'utf-8');
  const broken: BrokenLink[] = [];

  for (const match of contents.matchAll(markdownLinkPattern)) {
    const rawTarget = match[1].trim().split(/\s+/)[0];

    // Skip external URLs (`https:`, `mailto:`, protocol-relative) and links
    // that only point at a heading in the current file.
    if (externalTargetPattern.test(rawTarget) || rawTarget.startsWith('#')) {
      continue;
    }

    const fileTarget = rawTarget.split('#')[0];
    if (fileTarget.length === 0) {
      continue;
    }

    if (existsSync(resolve(dirname(file), fileTarget))) {
      continue;
    }

    broken.push({
      file: relative(repoRoot, file),
      line: contents.slice(0, match.index).split('\n').length,
      target: rawTarget,
    });
  }

  return broken;
};

const markdownFiles = collectMarkdownFiles(repoRoot);
const brokenLinks = markdownFiles.flatMap(findBrokenLinks);

if (brokenLinks.length > 0) {
  console.error(`Doc links: ${brokenLinks.length} broken target(s) across ${markdownFiles.length} Markdown files.\n`);

  for (const { file, line, target } of brokenLinks) {
    console.error(`  ${file}:${line}  ->  ${target}`);
  }

  process.exit(1);
}

console.info(`Doc links: OK (${markdownFiles.length} Markdown files).`);
