import {type Locator, type Page} from '@playwright/test';

export class TopHeader {
  readonly userAvatarBtn: Locator;
  readonly addBtn: Locator;
  readonly createContentBtn: Locator;
  readonly homeLogoBtn: Locator;
  readonly searchField: Locator;

  constructor(page: Page) {
    this.userAvatarBtn = page.locator('.UserDropdown__avatar-holder');
    this.addBtn = page.locator('.TopHeader__add-button');
    this.createContentBtn = page.locator('#show-gem-dialog');
    this.homeLogoBtn = page.locator('.LogoBackground__home-link');
    this.searchField = page.locator('#Search');
  }

  async createContent(): Promise<void> {
    await this.addBtn.click();
    await this.createContentBtn.click();
  }

  async clickHomeLogoBtn(): Promise<void> {
    await this.homeLogoBtn.click();
  }
}
