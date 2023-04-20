import {BaseClass} from 'src/ui/base-class';
import {HomePageSelectors} from 'src/ui/pages/google/home-page/home-page-selectors';
import {type Page} from '@playwright/test';

export class HomePageActions extends BaseClass {
  homePageSelectors;
  constructor(page: Page) {
    super(page);
    this.homePageSelectors = new HomePageSelectors(page);
  }
  async enterSearchText(text: string): Promise<void> {
    await this.homePageSelectors.searchField().type(text);
  }
  async startSearch(): Promise<void> {
    await this.homePageSelectors.searchBtn().click();
  }
}
