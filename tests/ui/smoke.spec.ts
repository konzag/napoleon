// Playwright smoke for the Napoleon pages, served under /napoleon/ with the hub's CSP (serve.mjs + hub-csp.mjs):
// every page opens with 0 console errors / 0 CSP violations and shows the hub shell (GAME-STANDARD §9),
// Diablo can be played with the keyboard, the LEGO builder saves and loads with the browser's real localStorage.
import { expect, test } from '@playwright/test';
import { PAGES, watch } from './pages';

test('all 6 pages open under the hub CSP with 0 console errors', async ({ page }) => {
  const problems = await watch(page);
  for (const p of PAGES) {
    const res = await page.goto(`/napoleon/${p}`);
    expect(res?.status(), p).toBe(200);
    expect(res?.headers()['content-security-policy'], p).toContain("default-src 'none'");
    await page.waitForLoadState('load');
    // The hub shell (GAME-STANDARD §9): 🏠 back to the hub and 🔊 sound switch.
    const home = page.locator('#hub-shell a');
    const sound = page.locator('#hub-shell button');
    await expect(home, p).toBeVisible();
    await expect(home, p).toHaveAttribute('href', '/');
    await expect(home, p).toHaveText('🏠');
    await expect(sound, p).toBeVisible();
    await expect(sound, p).toHaveText(/🔊|🔇/);
    await page.waitForTimeout(300); // late errors of the page's start-up code
  }
  expect(problems).toEqual([]);
});

test('diablo: title -> character select -> 10 s of keyboard play, 0 errors', async ({ page }) => {
  const problems = await watch(page);
  await page.goto('/napoleon/diablo-game/diablo.html');
  await expect(page.locator('#screen-title')).toBeVisible();
  await page.locator('#title-start-btn').click();
  await expect(page.locator('#screen-charselect')).toBeVisible();
  await page.locator('.char-card').first().click();
  await expect(page.locator('#start-btn')).toBeVisible();
  await page.locator('#start-btn').click();
  await expect(page.locator('#screen-game')).toBeVisible();

  // 10 s of play: walk around, attack (Space), cast a spell (Ctrl).
  const keys = ['ArrowRight', 'ArrowDown', 'Space', 'ArrowLeft', 'ArrowUp', 'KeyD', 'KeyS', 'Space', 'KeyA', 'KeyW', 'ControlLeft'];
  const end = Date.now() + 10_000;
  for (let i = 0; Date.now() < end; i++) {
    const key = keys[i % keys.length];
    await page.keyboard.down(key);
    await page.waitForTimeout(150);
    await page.keyboard.up(key);
  }
  // Still in a game screen (playing, game over or victory), never a blank page.
  await expect(page.locator('#screen-game, #screen-gameover, #screen-victory').filter({ visible: true })).toHaveCount(1);
  expect(problems).toEqual([]);
});

test('lego: build, save, reload, load', async ({ page }) => {
  const problems = await watch(page);
  await page.goto('/napoleon/index.html');
  await page.evaluate(() => localStorage.removeItem('napoleon_lego_saves'));
  await page.reload();
  await page.locator('#lego-toggle-btn').click();
  const cells = page.locator('.lego-cell');
  await expect(cells).toHaveCount(80);

  // Paint three bricks with the second colour and save the build as «Κάστρο».
  await page.locator('.palette-color').nth(1).click();
  for (const n of [0, 11, 79]) await cells.nth(n).click();
  const painted = await cells.evaluateAll((els) => els.map((e) => (e as HTMLElement).style.background || null));
  expect(painted.filter(Boolean)).toHaveLength(3);
  await page.locator('#lego-save-btn').click();
  await page.locator('#lego-design-name').fill('Κάστρο');
  await page.locator('#lego-confirm-save-btn').click();
  await expect(page.locator('#lego-counter')).toHaveText('1/345 αποθηκευμένα 🧱');

  // Reload the page: the build is still in the list, loading it paints the same bricks.
  await page.reload();
  await page.locator('#lego-toggle-btn').click();
  await expect(page.locator('#lego-counter')).toHaveText('1/345 αποθηκευμένα 🧱');
  await expect(cells.first()).toHaveAttribute('class', 'lego-cell');
  const empty = await cells.evaluateAll((els) => els.filter((e) => (e as HTMLElement).style.background).length);
  expect(empty).toBe(0);
  await page.locator('#lego-load-btn').click();
  await expect(page.locator('.lego-save-name')).toHaveText(['Κάστρο']);
  await page.locator('.lego-load-design-btn').click();
  const loaded = await cells.evaluateAll((els) => els.map((e) => (e as HTMLElement).style.background || null));
  expect(loaded).toEqual(painted);
  expect(problems).toEqual([]);
});
