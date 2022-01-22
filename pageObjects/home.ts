import { Locator, Page } from '@playwright/test';

const homePageUrl = process.env.BASE_URL as string;

export class Home {
  private page: Page;
  readonly userDropdownAvatar: Locator;
  readonly welcomeDashboard: Locator;
  readonly recentlyAddedGems: Locator;
  readonly notification: Locator;

  constructor(page: Page) {
    this.page = page;
    this.userDropdownAvatar = page.locator('[data-testid=user-dropdown-avatar-action]');
    this.welcomeDashboard = page.locator('.DashboardTopbar__welcome');
    this.recentlyAddedGems = page.locator('.DashboardLibraries + div > div.Dashboard__cards');
    this.notification = page.locator('.NotificationToastrContainer');
  }

  async open() {
    await this.page.goto(homePageUrl);
  }
}
