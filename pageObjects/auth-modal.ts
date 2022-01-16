import { Locator, Page } from '@playwright/test';

export class AuthModal {
  private emailField: Locator;
  private passwordField: Locator;
  private submitBtn: Locator;
  private login = process.env.LOGIN || '';
  private password = process.env.PASSWORD || '';

  constructor(page: Page) {
    this.emailField = page.locator('#auth_email');
    this.passwordField = page.locator('#auth_pass');
    this.submitBtn = page.locator('button.auth-modal__submit');
  }

  async singIn() {
    await this.emailField.fill(this.login);
    await this.passwordField.fill(this.password);
    await this.submitBtn.click();
  }
}
