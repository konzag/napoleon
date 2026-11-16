// school-game/school.html in a real browser, under the hub CSP (L1-37, L4-29): the first grade (Α') is open first
// and no tab has a star (no child's class on the page), and the page asks nothing from another host:
// no stylesheet or font from outside, the Comfortaa files come from school-game/fonts/ in this repo.
import { expect, test } from '@playwright/test';
import { watch } from './pages';

test("school: the first grade (Α') is open first, no star, fonts are local, 0 requests to another host", async ({ page, baseURL }) => {
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
  await expect(tab).toHaveText("Α' Δημοτικού");
  await expect(page.locator('#grade-a')).toBeVisible();
  await expect(page.locator('#grade-b')).toBeHidden();
  await expect(page.locator('.grade-tab-btn', { hasText: '⭐' })).toHaveCount(0);
  await expect(page.locator('.subtitle')).not.toContainText('Δημοτικού');
  // a click still switches the grade: the picker stays
  await page.locator('.grade-tab-btn[data-grade="b"]').click();
  await expect(page.locator('#grade-b')).toBeVisible();
  await expect(page.locator('#grade-a')).toBeHidden();

  expect(foreign).toEqual([]);
  expect(fonts.length).toBeGreaterThan(0);
  for (const f of fonts) {
    expect(f.url).toMatch(/^\/napoleon\/school-game\/fonts\/comfortaa-[a-z]+-\d+-normal\.woff2$/);
    expect(f.status).toBe(200);
  }
  expect(problems).toEqual([]);
});

// Owner 16/11 (DECISIONS §4): each grade has one card now; it sits in the middle of the page, with no empty
// column next to it, at phone, tablet and desktop width.
for (const width of [360, 820, 1280]) {
  test(`school: the one card of the open grade is centred, no empty slot (${width} px)`, async ({ page }) => {
    await page.setViewportSize({ width, height: 900 });
    await page.goto('/napoleon/school-game/school.html');
    const grid = page.locator('#grade-a .links-grid');
    const card = grid.locator('.link-card');
    await expect(card).toHaveCount(1);
    await expect(card.locator('a.link-btn')).toHaveAttribute('href', /^https:\/\/www\.stintaxi\.com\//);
    const g = (await grid.boundingBox())!;
    const c = (await card.boundingBox())!;
    const left = c.x - g.x;
    const right = g.x + g.width - (c.x + c.width);
    expect(Math.abs(left - right)).toBeLessThanOrEqual(2);
    expect(c.width).toBeGreaterThanOrEqual(Math.min(260, g.width - 2));
  });
}
