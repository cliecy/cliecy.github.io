import AxeBuilder from '@axe-core/playwright';
import { expect, test } from '@playwright/test';

const draftSlugs = [
  'welcome-to-my-new-portfolio',
  'future-of-web-development',
];
const publishedSlug = 'amakano-2-kurohime-yuu-review';

test('home, writing, projects, and 404 render Chinese by default', async ({ page }) => {
  await page.goto('/');
  await expect(page.locator('html')).toHaveAttribute('lang', 'zh-CN');
  await expect(page.getByRole('heading', { level: 1 })).toContainText('你好，我是 CLIECY。');
  await expect(page.getByRole('navigation', { name: '主导航' }).getByText('项目')).toHaveCount(0);
  await expect(page.locator('canvas')).toHaveCount(0);

  await page.goto('/blog/');
  await expect(page.getByRole('heading', { level: 1 }).locator('.ui-copy--zh')).toHaveText('文章');
  await expect(page.getByRole('link', { name: /黒姫結灯/ })).toBeVisible();

  await page.goto('/projects/');
  await expect(page.getByText('项目正在准备中。')).toBeVisible();

  const response = await page.goto('/not-a-real/deep/url/');
  expect(response?.status()).toBe(404);
  await expect(page.getByRole('heading', { level: 1 }).locator('.ui-copy--zh')).toHaveText('这里什么也没有。');
});

test('language switch changes the interface and persists', async ({ page }) => {
  await page.goto('/');
  const toggle = page.getByRole('button', { name: 'Switch to English' });
  await expect(toggle).toBeVisible();
  await toggle.click();

  await expect(page.locator('html')).toHaveAttribute('lang', 'en');
  await expect(page.getByRole('heading', { level: 1 }).locator('.ui-copy--en')).toHaveText("Hi, I'm CLIECY.");
  await expect(page).toHaveTitle('CLIECY — Developer & Creator');

  await page.goto('/blog/');
  await expect(page.getByRole('heading', { level: 1 }).locator('.ui-copy--en')).toHaveText('Writing');
  await expect(page.getByRole('button', { name: '切换到中文' })).toBeVisible();

  await page.reload();
  await expect(page.getByRole('heading', { level: 1 }).locator('.ui-copy--en')).toHaveText('Writing');
});

test('published article renders while drafts and legacy routes return 404', async ({ page, request }) => {
  const published = await request.get(`/blog/${publishedSlug}/`);
  expect(published.status()).toBe(200);

  await page.goto(`/blog/${publishedSlug}/`);
  await expect(page.locator('html')).toHaveAttribute('lang', 'ja');
  await expect(page.getByRole('heading', { level: 1 })).toContainText('黒姫結灯');

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

  for (const output of outputs) expect(output).toContain(publishedSlug);
});

for (const width of [320, 768, 1440]) {
  test(`layout has no horizontal overflow at ${width}px`, async ({ page }) => {
    await page.setViewportSize({ width, height: 900 });
    for (const path of ['/', '/blog/', `/blog/${publishedSlug}/`, '/projects/', '/404.html']) {
      await page.goto(path);
      const overflow = await page.evaluate(() => document.documentElement.scrollWidth - window.innerWidth);
      expect(overflow, path).toBeLessThanOrEqual(1);
    }
  });
}

test('skip link and keyboard focus are visible', async ({ page }) => {
  await page.goto('/');
  await page.keyboard.press('Tab');
  const skipLink = page.getByRole('link', { name: '跳到正文' });
  await expect(skipLink).toBeFocused();
  await expect(skipLink).toBeVisible();
  await page.keyboard.press('Enter');
  await expect(page).toHaveURL(/#main-content$/);
});

test('site ships no 3D canvas or Three.js client bundle', async ({ page }) => {
  const requests: string[] = [];
  page.on('request', (request) => requests.push(request.url()));
  await page.goto('/');

  await expect(page.locator('canvas')).toHaveCount(0);
  expect(requests.some((url) => /heroScene|three|fiber/i.test(url))).toBe(false);
});

test('SEO metadata is canonical and Chinese by default', async ({ page }) => {
  await page.goto('/blog/');
  await expect(page.locator('html')).toHaveAttribute('lang', 'zh-CN');
  await expect(page.locator('link[rel="canonical"]')).toHaveAttribute(
    'href',
    'https://cliecy.github.io/blog/',
  );
  await expect(page.locator('meta[property="og:title"]')).toHaveAttribute('content', /文章/);
  await expect(page.locator('meta[name="twitter:card"]')).toHaveAttribute(
    'content',
    'summary_large_image',
  );
});

for (const path of ['/', '/blog/', `/blog/${publishedSlug}/`, '/projects/', '/404.html']) {
  test(`no serious accessibility violations on ${path}`, async ({ page }) => {
    await page.goto(path);
    const results = await new AxeBuilder({ page }).analyze();
    const serious = results.violations.filter((violation) =>
      ['serious', 'critical'].includes(violation.impact ?? ''),
    );
    expect(serious).toEqual([]);
  });
}
