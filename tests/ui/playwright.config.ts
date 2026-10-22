import { defineConfig } from '@playwright/test';

// Own port (not the games-template 4173): other repos' test servers may run on the same machine.
const port = Number(process.env.PORT || 4319);

// Playwright for the Napoleon pages, served under /napoleon/ with the hub's CSP by serve.mjs (TEST-ONLY).
// Run: cd tests/ui && npm ci && npx playwright install chromium && npx playwright test
export default defineConfig({
  testDir: '.',
  testMatch: '*.spec.ts',
  timeout: 60_000,
  forbidOnly: !!process.env.CI,
  retries: 0,
  reporter: process.env.CI ? [['list'], ['github']] : 'list',
  use: { baseURL: `http://127.0.0.1:${port}`, browserName: 'chromium' },
  webServer: {
    command: 'node serve.mjs',
    url: `http://127.0.0.1:${port}/napoleon/`,
    reuseExistingServer: !process.env.CI,
  },
  projects: [{ name: 'desktop', use: { viewport: { width: 1280, height: 800 } } }],
});
