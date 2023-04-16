import {type Locator, type Page} from '@playwright/test';

export class BaseClass {
  private readonly page: Page;
  constructor(page: Page) {
    this.page = page;
  }
  async goto(url: string): Promise<void> {
    await this.page.goto(url);
  }
  locator(
    selector: string,
    options?:
      | {has?: Locator | undefined; hasText?: string | RegExp | undefined}
      | undefined
  ): Locator {
    return this.page.locator(selector, options);
  }
}
