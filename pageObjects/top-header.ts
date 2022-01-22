import { Locator, Page } from '@playwright/test';

export class TopHeader {
  readonly userDropdownAvatar: Locator;
  readonly addBtn: Locator;
  readonly createCategoryBtn: Locator;
  readonly homeLogoBtn: Locator;
  readonly searchField: Locator;

  constructor(page: Page) {
    this.userDropdownAvatar = page.locator('[data-testid=user-dropdown-avatar-action]');
    this.addBtn = page.locator('[data-testid=add-content-button]');
    this.createCategoryBtn = page.locator('#show-gem-dialog');
    this.homeLogoBtn = page.locator('a.LogoBackground__home-link');
    this.searchField = page.locator('#Search');
  }

  async createContent() {
    await this.addBtn.click();
    await this.createCategoryBtn.click();
  }

  async clickHomeLogoBtn() {
    await this.homeLogoBtn.click();
  }
}
