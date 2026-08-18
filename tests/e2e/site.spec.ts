import AxeBuilder from '@axe-core/playwright';
import { expect, test } from '@playwright/test';

const draftSlugs = [
  'amakano-2-kurohime-yuu-review',
  'welcome-to-my-new-portfolio',
  'future-of-web-development',
];

test('home, writing, projects, and 404 render expected production states', async ({ page }) => {
  await page.goto('/');
  await expect(page.getByRole('heading', { level: 1 })).toContainText('Ideas, made tangible.');
  await expect(page.getByRole('navigation', { name: 'Primary navigation' }).getByText('Projects')).toHaveCount(0);

  await page.goto('/blog/');
  await expect(page.getByText('Writing is being prepared.')).toBeVisible();

  await page.goto('/projects/');
  await expect(page.getByText('Projects are being prepared.')).toBeVisible();

  const response = await page.goto('/not-a-real/deep/url/');
  expect(response?.status()).toBe(404);
  await expect(page.getByRole('heading', { level: 1 })).toHaveText('Nothing lives here.');
});

test('draft and removed legacy routes return 404', async ({ request }) => {
  for (const slug of draftSlugs) {
    const response = await request.get(`/blog/${slug}/`);
    expect(response.status(), slug).toBe(404);
  }

  expect((await request.get('/blog/1/')).status()).toBe(404);
  expect((await request.get('/admin/')).status()).toBe(404);
});

test('drafts stay out of pages, RSS, and sitemap', async ({ request }) => {
  const [home, blog, rss, sitemap] = await Promise.all([
    request.get('/'),
    request.get('/blog/'),
    request.get('/rss.xml'),
    request.get('/sitemap-0.xml'),
  ]);
  const outputs = await Promise.all([home.text(), blog.text(), rss.text(), sitemap.text()]);

  for (const output of outputs) {
    for (const slug of draftSlugs) expect(output).not.toContain(slug);
    expect(output).not.toContain('Welcome to My New Portfolio');
  }
});

for (const width of [320, 768, 1440]) {
  test(`layout has no horizontal overflow at ${width}px`, async ({ page }) => {
    await page.setViewportSize({ width, height: 900 });
    for (const path of ['/', '/blog/', '/projects/', '/404.html']) {
      await page.goto(path);
      const overflow = await page.evaluate(() => document.documentElement.scrollWidth - window.innerWidth);
      expect(overflow, path).toBeLessThanOrEqual(1);
    }
  });
}

test('skip link and keyboard focus are visible', async ({ page }) => {
  await page.goto('/');
  await page.keyboard.press('Tab');
  const skipLink = page.getByRole('link', { name: 'Skip to content' });
  await expect(skipLink).toBeFocused();
  await expect(skipLink).toBeVisible();
  await page.keyboard.press('Enter');
  await expect(page).toHaveURL(/#main-content$/);
});

test('mobile and reduced motion do not mount the 3D canvas', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto('/');
  await expect(page.locator('canvas')).toHaveCount(0);

  await page.setViewportSize({ width: 1200, height: 900 });
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.reload();
  await expect(page.locator('canvas')).toHaveCount(0);
});

test('desktop 3D canvas is interactive without covering hero links', async ({ page }) => {
  await page.setViewportSize({ width: 1200, height: 900 });
  await page.emulateMedia({ reducedMotion: 'no-preference' });
  await page.goto('/');

  const canvas = page.locator('.hero__visual canvas');
  await expect(canvas).toBeVisible({ timeout: 15_000 });
  await expect(page.getByRole('link', { name: /Read the writing/ })).toBeVisible();

  const hitTarget = await canvas.evaluate((element) => {
    const bounds = element.getBoundingClientRect();
    const target = document.elementFromPoint(bounds.left + bounds.width / 2, bounds.top + bounds.height / 2);
    return target?.tagName.toLowerCase();
  });
  expect(hitTarget).toBe('canvas');
});

test('blog page does not request the home 3D client bundle', async ({ page }) => {
  const scripts: string[] = [];
  page.on('request', (request) => {
    if (request.resourceType() === 'script') scripts.push(request.url());
  });
  await page.goto('/blog/');

  expect(scripts.some((url) => /heroScene|three|fiber/i.test(url))).toBe(false);
});

test('SEO metadata is canonical and complete', async ({ page }) => {
  await page.goto('/blog/');
  await expect(page.locator('html')).toHaveAttribute('lang', 'en');
  await expect(page.locator('link[rel="canonical"]')).toHaveAttribute(
    'href',
    'https://cliecy.github.io/blog/',
  );
  await expect(page.locator('meta[property="og:title"]')).toHaveAttribute('content', /Writing/);
  await expect(page.locator('meta[name="twitter:card"]')).toHaveAttribute(
    'content',
    'summary_large_image',
  );
});

for (const path of ['/', '/blog/', '/projects/', '/404.html']) {
  test(`no serious accessibility violations on ${path}`, async ({ page }) => {
    await page.goto(path);
    const results = await new AxeBuilder({ page }).analyze();
    const serious = results.violations.filter((violation) =>
      ['serious', 'critical'].includes(violation.impact ?? ''),
    );
    expect(serious).toEqual([]);
  });
}
