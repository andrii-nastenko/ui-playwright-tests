import {type Locator, type Page} from '@playwright/test';

const homePageUrl = process.env.BASE_URL as string;

export class Home {
  private readonly page: Page;
  readonly recentlyAddedGems: Locator;
  readonly actionCards: Locator;
  readonly notificationPopUp: Locator;

  constructor(page: Page) {
    this.page = page;
    this.recentlyAddedGems = page.locator('.LabelHeader + .Dashboard__cards');
    this.actionCards = page.locator('.ActionCards__cards');
    this.notificationPopUp = page.locator('.NotificationToastrContainer');
  }

  async open(path = ''): Promise<void> {
    await this.page.goto(`${homePageUrl}/${path}`);
  }
}
