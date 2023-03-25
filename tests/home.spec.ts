import { expect, test } from "@playwright/test";
import { Home } from "../pageObjects/home";

test.describe("Home page:", () => {
  let homePage: Home;

  test.beforeAll(async ({ browser }) => {
    const context = await browser.newContext();
    const page = await context.newPage();
    homePage = new Home(page);
    await homePage.open();
  });

  test("should contain recently added gem", async () => {
    await expect(homePage.recentlyAddedGems.first()).toBeVisible();
  });

  test("should contain action cards section", async () => {
    await expect(homePage.actionCards).toBeVisible();
  });
});
