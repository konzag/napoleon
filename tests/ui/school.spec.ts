// school-game/school.html in a real browser, under the hub CSP (L1-37, school year 2026-27):
// the Β' grade is what Napoleon sees first, and the page asks nothing from another host:
// no stylesheet or font from outside, the Comfortaa files come from school-game/fonts/ in this repo.
import { expect, test } from '@playwright/test';
import { watch } from './pages';

test("school: Β' Δημοτικού is open first, fonts are local, 0 requests to another host", async ({ page, baseURL }) => {
  const problems = await watch(page);
  const origin = new URL(baseURL!).origin;
  const foreign: string[] = [];
  const fonts: { url: string; status: number }[] = [];
  page.on('request', (r) => {
    if (new URL(r.url()).origin !== origin && !r.url().startsWith('data:')) foreign.push(`${r.resourceType()} ${r.url()}`);
  });
  page.on('response', (r) => {
    if (r.request().resourceType() === 'font') fonts.push({ url: new URL(r.url()).pathname, status: r.status() });
  });

  await page.goto('/napoleon/school-game/school.html');
  await page.evaluate(() => document.fonts.ready);
  await page.waitForLoadState('networkidle');

  const tab = page.locator('.grade-tab-btn.active');
  await expect(tab).toHaveCount(1);
  await expect(tab).toHaveText("Β' Δημοτικού ⭐");
  await expect(page.locator('#grade-b')).toBeVisible();
  await expect(page.locator('#grade-a')).toBeHidden();
  await expect(page.locator('.subtitle')).toContainText("Β' Δημοτικού");

  expect(foreign).toEqual([]);
  expect(fonts.length).toBeGreaterThan(0);
  for (const f of fonts) {
    expect(f.url).toMatch(/^\/napoleon\/school-game\/fonts\/comfortaa-[a-z]+-\d+-normal\.woff2$/);
    expect(f.status).toBe(200);
  }
  expect(problems).toEqual([]);
});
