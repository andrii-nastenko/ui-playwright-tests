import {BaseClass} from 'src/ui/base-class';
import {type Locator} from '@playwright/test';

class Header extends BaseClass {
  header = (): Locator => this.page.locator('//nav[@data-testid="header-container"]');
  profileBtn = (): Locator =>
    this.page.locator('//*[@data-testid="header-member-menu-button"]');
  profileMenu = (): Locator =>
    this.page.locator('//*[@data-testid="header-member-menu-popover"]');
  userInfo = (type: 'email' | 'name'): Locator =>
    this.profileMenu().locator(`//div[text()][${type === 'name' ? 1 : 2}]`);
  getUserInfo(type: 'email' | 'name'): Promise<string> {
    return this.userInfo(type).innerText();
  }
  async openProfile(): Promise<void> {
    await this.profileBtn().click();
  }
}

export {Header};
