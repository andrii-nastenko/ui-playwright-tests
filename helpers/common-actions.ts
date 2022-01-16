import { Page } from '@playwright/test';

const BASE_URL = process.env.BASE_URL;

export const actions = {
  async goto(page: Page, route = '') {
    await page.goto(`${BASE_URL}/${route}`);
  },

  async isVisible(page: Page, locator: string): Promise<boolean> {
    await page.waitForSelector(locator);
    return await page.isVisible(locator);
  }
};
