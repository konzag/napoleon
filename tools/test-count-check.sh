#!/usr/bin/env bash
# Test-count ratchet (TEST-STANDARD v1 §R-JS fallback): node coverage cannot see the pages (they run in
# node:vm), so the floor in .coverage-floor is a TEST COUNT, not a percentage:
#   node tests  (`ℹ tests N` of `node --test --test-reporter=spec tests/*.mjs`; spec, since Node 22 prints TAP off a TTY)
# + Playwright  (`Total: M tests` of `cd tests/ui && npx playwright test --list`, needs `npm ci` there)
# Fails when the sum is below the floor. The floor itself may only go up (tools/coverage-floor-check.sh).
# Usage: tools/test-count-check.sh            (from the repo root)
set -euo pipefail
cd "$(dirname "$0")/.."

floor=$(grep -oE '^[0-9]+' .coverage-floor | head -1 || true)
if [ -z "$floor" ]; then echo "::error::test-count-check: no number in .coverage-floor"; exit 2; fi

node_out=$(node --test --test-reporter=spec tests/*.mjs 2>&1 || true)   # a red test is the test step's job; here we only count
node_n=$(grep -oE '^ℹ tests [0-9]+' <<<"$node_out" | grep -oE '[0-9]+$' | tail -1 || true)
pw_out=$( { cd tests/ui && npx --no-install playwright test --list; } 2>&1 || true)
pw_n=$(grep -oE '^Total: [0-9]+ tests?' <<<"$pw_out" | grep -oE '[0-9]+' | head -1 || true)
if [ -z "$node_n" ] || [ -z "$pw_n" ]; then
  echo "::error::test-count-check: could not count (node='${node_n}' playwright='${pw_n}')"
  printf '%s\n' "$pw_out" | tail -5
  exit 2
fi

total=$((node_n + pw_n))
echo "test count: node $node_n + playwright $pw_n = $total (floor $floor)"
if [ "$total" -lt "$floor" ]; then
  echo "::error::test count $total is below the floor $floor (.coverage-floor): a test was removed"
  exit 1
fi
