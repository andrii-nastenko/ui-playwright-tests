import { expect, test } from '@playwright/test';
import { HomePage } from '../pageObjects/home-page';

test.describe('Home page:', () => {
  let homePage: HomePage;

  test.beforeAll(async ({ browser }) => {
    const context = await browser.newContext();
    const page = await context.newPage();
    homePage = new HomePage(page);
    await homePage.open();
  });

  test.afterAll(async ({ browser }) => {
    await browser.close();
  });

  test('user welcome dashboard should contain user name', async () => {
    await expect(homePage.welcomeDashboard).toContainText('Andrii');
  });
});
