import { Locator, Page } from '@playwright/test';

export class TopHeader {
  readonly userDropdownAvatar: Locator;

  constructor(page: Page) {
    this.userDropdownAvatar = page.locator('[data-testid=user-dropdown-avatar-action]');
  }
}
