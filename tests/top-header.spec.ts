import { expect, test } from "@playwright/test";
import { Home } from "../pageObjects/home";
import { TopHeader } from "../pageObjects/top-header";

test.describe("Top header:", () => {
  let topHeader: TopHeader;

  test.beforeAll(async ({ browser }) => {
    const context = await browser.newContext();
    const page = await context.newPage();
    await new Home(page).open();
    topHeader = new TopHeader(page);
  });

  test("user avatar button should be visible", async () => {
    await expect(topHeader.userAvatarBtn).toBeVisible();
  });

  test("search field should be visible", async () => {
    await expect(topHeader.searchField).toBeVisible();
  });
});
