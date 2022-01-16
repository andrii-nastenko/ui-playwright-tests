import { Locator, Page } from '@playwright/test';

export class WishlistPage {
  readonly items: Locator;

  constructor(page: Page) {
    this.items = page.locator('ul.wish-grid');
  }
}
