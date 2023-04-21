import {BaseClass} from 'src/ui/base-class';
import {type Locator} from '@playwright/test';

class HomePage extends BaseClass {
  searchField = (): Locator => this.page.locator('//*[@name="q"]');
  searchSuggestionsSection = (): Locator => this.page.locator('//*[@class="UUbT9"]');
  searchBtn = (): Locator => this.page.locator('//*[@style]//*[@value="Google Search"]');
  async enterSearchText(text: string): Promise<void> {
    await this.searchField().type(text);
  }
  async startSearch(): Promise<void> {
    await this.searchBtn().click();
  }
}

export {HomePage};
