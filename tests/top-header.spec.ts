import { expect, test } from '@playwright/test';
import { Home } from '../pageObjects/home';
import { TopHeader } from '../pageObjects/top-header';

test.describe('Top header:', () => {
  let topHeader: TopHeader;

  test.beforeAll(async ({ browser }) => {
    const context = await browser.newContext();
    const page = await context.newPage();
    await new Home(page).open();
    topHeader = new TopHeader(page);
  });

  test.afterAll(async ({ browser }) => {
    await browser.close();
  });

  test('user dropdown avatar should be visible', async () => {
    await expect(topHeader.userDropdownAvatar).toBeVisible();
  });

  test('user contain search field', async () => {
    await expect(topHeader.searchField).toBeVisible();
  });
});
