import {BaseClass} from 'src/ui/base-class';
import {type Locator, type Page} from '@playwright/test';

export class HomePageSelectors extends BaseClass {
  constructor(page: Page) {
    super(page);
  }
  searchField = (): Locator => this.locator('//*[@name="q"]');
  searchBtn = (): Locator => this.locator('//*[@style]//*[@value="Google Search"]');
}
