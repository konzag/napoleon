// security-workflow.test.mjs — L1-38: the Security workflow keeps a blocking, pinned Trivy scan on the
// GitHub-hosted runner (public repo: never the homelab runner), with a read-only token. File check only.
// Run: node --test tests/*.test.mjs
import { test } from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const wf = fs.readFileSync(path.join(root, '.github', 'workflows', 'security.yml'), 'utf8').replace(/\r\n/g, '\n');

test('security.yml: named Security, runs on PRs and pushes to staging/main, read-only token', () => {
  assert.match(wf, /^name: Security$/m);
  assert.match(wf, /^ {2}pull_request:\n {4}branches: \[staging, main\]$/m);
  assert.match(wf, /^ {2}push:\n {4}branches: \[staging, main\]$/m);
  assert.match(wf, /^permissions:\n {2}contents: read\n\n/m);
});

test('security.yml: every job on ubuntu-latest, every action pinned by SHA', () => {
  const runsOn = [...wf.matchAll(/^\s*runs-on:\s*(\S+)/gm)].map(m => m[1]);
  assert.ok(runsOn.length > 0, 'no runs-on found');
  assert.deepEqual([...new Set(runsOn)], ['ubuntu-latest']);
  assert.doesNotMatch(wf, /self-hosted|vars\.RUNNER/);
  for (const [, ref] of wf.matchAll(/uses:\s*\S+@(\S+)/g)) assert.match(ref, /^[0-9a-f]{40}$/);
});

test('security.yml: trivy is checksum-verified and its gate fails the run', () => {
  assert.match(wf, /TRIVY_VERSION: "\d+\.\d+\.\d+"/);
  assert.match(wf, /TRIVY_SHA256: "[0-9a-f]{64}"/);
  assert.match(wf, /sha256sum -c -/);
  assert.match(wf, /trivy fs \. --severity HIGH,CRITICAL --ignore-unfixed --exit-code 1/);
  assert.doesNotMatch(wf, /continue-on-error/);
  // `gitleaks` is a required check from ci.yml: no job here may take that check name.
  assert.doesNotMatch(wf, /^\s+(name: )?gitleaks:?$/m);
});
