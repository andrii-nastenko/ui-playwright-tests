import {test, expect} from '@playwright/test';

test.describe('Google:', () => {
    let searchResultDOM

    test.beforeEach(async ({ page }) => {
        await page.goto("https://www.google.com");
        await page.type("[name='q']", "weather");
        await page.click("[name='btnK']");
        searchResultDOM = page.locator("#rso");
    });

    test('Search weather', async () => {
         await expect(searchResultDOM).toContainText("National and Local Weather Radar");
    });
})