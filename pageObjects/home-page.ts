import { Locator, Page } from '@playwright/test';

const homePageUrl = process.env.BASE_URL as string;

export class HomePage {
  private page: Page;
  readonly userDropdownAvatar: Locator;
  readonly welcomeDashboard: Locator;

  constructor(page: Page) {
    this.page = page;
    this.userDropdownAvatar = page.locator('[data-testid=user-dropdown-avatar-action]');
    this.welcomeDashboard = page.locator('.DashboardTopbar__welcome');
  }

  async open() {
    await this.page.goto(homePageUrl);
  }
}
