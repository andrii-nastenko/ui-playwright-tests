import { expect, test } from '@playwright/test';
import { Home } from '../pageObjects/home';
import { TopHeader } from '../pageObjects/top-header';
import { NewContent } from '../pageObjects/new-content';
import * as faker from 'faker';

test.describe('Wiki:', () => {
  test('should create new Wiki category', async ({ page }) => {
    const home = await new Home(page);
    await home.open();

    const topHeader = new TopHeader(page);
    await topHeader.createContent();
    const content = new NewContent(page);
    await expect(content.mainSection).toBeVisible();

    await content.createWiki();
    await expect(content.wikiSection).toBeVisible();

    const title = faker.name.title();
    await content.fillTitleField(title);
    await content.fillDescriptionField(faker.lorem.sentence());
    await content.create();

    await content.fillTextArea(faker.lorem.sentences(3));
    await content.saveChanges();
    await expect(home.notification).toContainText(`Successfully updated Gem ${title}`);

    await topHeader.clickHomeLogoBtn();
    await expect(home.recentlyAddedGems.first()).toContainText(title);
  });
});
