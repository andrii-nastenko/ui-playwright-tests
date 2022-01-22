import { expect, test } from '@playwright/test';
import { Home } from '../pageObjects/home';

test.describe('Home page:', () => {
  let homePage: Home;

  test.beforeAll(async ({ browser }) => {
    const context = await browser.newContext();
    const page = await context.newPage();
    homePage = new Home(page);
    await homePage.open();
  });

  test.afterAll(async ({ browser }) => {
    await browser.close();
  });

  test('user welcome dashboard should contain user name', async () => {
    await expect(homePage.welcomeDashboard).toContainText('Welcome, Andrii');
  });
});
