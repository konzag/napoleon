// workflow-concurrency.test.mjs — CI-NO-CONCURRENCY (owner 2026-11-15): the CI and scan workflows carry no
// `concurrency` (workflow- or job-level), so a run is never left «pending» by a group GitHub did not release
// (logvault 4e6fa59, 2026-11-14). Safe here because every job runs on GitHub-hosted ubuntu-latest (own VM per job):
// the fixed Playwright port 4319 (tests/ui/playwright.config.mjs) cannot clash between two runs. File check only.
// Run: node --test tests/*.test.mjs
import { test } from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const dir = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..', '.github', 'workflows');
const CI_AND_SCAN = ['security.yml', 'test.yml'];
const read = f => fs.readFileSync(path.join(dir, f), 'utf8').replace(/\r\n/g, '\n');

test('every workflow is a listed CI/scan workflow (a new one must be checked here)', () => {
  assert.deepEqual(fs.readdirSync(dir).filter(f => /\.ya?ml$/.test(f)).sort(), CI_AND_SCAN);
});

for (const f of CI_AND_SCAN) {
  test(`${f}: no concurrency key anywhere`, () => {
    const wf = read(f);
    assert.doesNotMatch(wf, /^\s*concurrency\s*:/m);
    assert.doesNotMatch(wf, /cancel-in-progress/);
  });

  test(`${f}: every job on GitHub-hosted ubuntu-latest (no shared runner without concurrency)`, () => {
    const wf = read(f);
    const runsOn = [...wf.matchAll(/^\s*runs-on:\s*(\S+)/gm)].map(m => m[1]);
    assert.ok(runsOn.length > 0, 'no runs-on found');
    assert.deepEqual([...new Set(runsOn)], ['ubuntu-latest']);
    assert.doesNotMatch(wf, /self-hosted|vars\.RUNNER/);
  });
}
