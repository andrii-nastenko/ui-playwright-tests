import { expect, test } from "@playwright/test";
import { Home } from "../pageObjects/home";
import { TopHeader } from "../pageObjects/top-header";
import { CreateContent } from "../pageObjects/create-content";
import { faker } from "@faker-js/faker";

test.describe.serial("Create Wiki:", () => {
  let homePage: Home;
  let createContentPage: CreateContent;
  let topHeader: TopHeader;
  const title = faker.name.jobTitle();

  test.beforeAll(async ({ browser }) => {
    const context = await browser.newContext();
    const page = await context.newPage();
    homePage = new Home(page);
    topHeader = new TopHeader(page);
    createContentPage = new CreateContent(page);
    await homePage.open();
  });

  test("create-content section should be visible", async () => {
    await topHeader.createContent();
    await expect(createContentPage.mainSection).toBeVisible();
  });

  test("wiki section icon should be visible", async () => {
    await createContentPage.createWiki();
    await expect(createContentPage.wikiSectionIcon).toBeVisible();
  });

  test("should create new Wiki", async () => {
    await createContentPage.fillTitle(title);
    await createContentPage.fillDescription(faker.lorem.sentence());
    await createContentPage.createGem();
    await expect(createContentPage.breadcrumbs).toContainText(title);
  });

  test("should update Wiki text area content", async () => {
    await createContentPage.fillTextArea(faker.lorem.sentences(3));
    await createContentPage.saveChanges();
    await expect(homePage.notificationPopUp).toContainText(`Successfully updated Gem ${title}`);
  });

  test("should verify recently created Wiki category", async () => {
    await topHeader.clickHomeLogoBtn();
    await expect(homePage.recentlyAddedGems.first()).toContainText(title);
  });
});
