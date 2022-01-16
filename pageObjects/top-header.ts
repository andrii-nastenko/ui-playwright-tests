import { Locator, Page } from '@playwright/test';

export class TopHeader {
  private wishListBtn: Locator;
  private userBtn: Locator;

  constructor(page: Page) {
    this.wishListBtn = page.locator('rz-wishlist');
    this.userBtn = page.locator('rz-user');
  }

  async wishListClick() {
    await this.wishListBtn.click();
  }

  async userBtnClick() {
    await this.userBtn.click();
  }
}
