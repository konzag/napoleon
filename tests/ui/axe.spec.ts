// axe-core on the 6 Napoleon pages, light + dark, phone (360) + desktop (1280): 0 serious/critical violations.
// A page that fails today is an APP BUG (listed in KNOWN below and in FIX-NAPOLEON-TESTBUGS), marked test.fail:
// the old games are not changed in a test run (GAME-STANDARD §9). When the fix lands, test.fail turns red: remove
// the entry from KNOWN then.
import AxeBuilder from '@axe-core/playwright';
import { expect, test } from '@playwright/test';
import { PAGES } from './pages';

// page -> APP BUG id + what axe finds (serious/critical rules), for every scheme/width.
const KNOWN: Record<string, string> = {};

for (const p of PAGES) {
  for (const colorScheme of ['light', 'dark'] as const) {
    for (const width of [360, 1280]) {
      test(`axe serious/critical = 0: ${p} ${colorScheme} ${width}`, async ({ page }) => {
        if (KNOWN[p]) test.fail(true, KNOWN[p]);
        await page.emulateMedia({ colorScheme });
        await page.setViewportSize({ width, height: width < 600 ? 740 : 800 });
        await page.goto(`/napoleon/${p}`);
        await page.waitForLoadState('load');
        // Let fade-in animations end first (anatomy: .section-screen fades in for 0.25 s), else axe measures
        // the colours half-transparent and reports a contrast problem the child never sees.
        await page.evaluate(() =>
          Promise.all(
            document.getAnimations()
              .filter((a) => a.effect?.getComputedTiming().iterations !== Infinity)
              .map((a) => a.finished.catch(() => undefined)),
          ),
        );
        const results = await new AxeBuilder({ page }).withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa']).analyze();
        const bad = results.violations
          .filter((v) => v.impact === 'serious' || v.impact === 'critical')
          .map((v) => `${v.impact} ${v.id} (${v.nodes.length}): ${v.nodes.slice(0, 3).map((n) => n.target.join(' ')).join(' | ')}`);
        expect(bad, `${p} ${colorScheme} ${width}`).toEqual([]);
      });
    }
  }
}
