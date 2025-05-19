import { expect, test } from '@playwright/test';

test('Verify Playwright is working', async ({ page }) => {
    //await page.goto('https://www.nissanusa.com/shopping-tools/build-price');
    await page.goto('https://playwright.dev/');
    const title = await page.title();
    expect(title).toContain('Playwright');
});