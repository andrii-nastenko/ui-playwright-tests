import {BaseClass} from 'src/ui/base-class';
import {type Locator} from '@playwright/test';

class LoginPage extends BaseClass {
  emailField = (): Locator => this.page.locator('//input[@id="user"]');
  continueBtn = (): Locator => this.page.locator('//input[@id="login"]');
  passwordField = (): Locator =>
    this.page.locator('//*[contains(@aria-labelledby,"password")]');
  loginBtn = (): Locator => this.page.locator('//button[@id="login-submit"]');
  async enterEmail(email: string): Promise<void> {
    await this.emailField().type(email);
  }
  async pressContinue(): Promise<void> {
    await this.continueBtn().click();
  }
  async enterPassword(password: string): Promise<void> {
    await this.passwordField().type(password);
  }
  async pressLogin(): Promise<void> {
    await this.loginBtn().click();
  }
  async login(params: {email: string; password: string}): Promise<void> {
    await this.page.goto(`${process.env.TRELLO_URL}/login`);
    await this.enterEmail(params.email);
    await this.pressContinue();
    await this.enterPassword(params.password);
    await this.pressLogin();
  }
}

export {LoginPage};
