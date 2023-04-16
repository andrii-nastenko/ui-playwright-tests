import {BaseClass} from 'src/ui/base-class';
import {type Locator, type Page} from '@playwright/test';

export class ResultsPageSelectors extends BaseClass {
  constructor(page: Page) {
    super(page);
  }
  searchResultsSection = (): Locator => this.locator('//div[@id="rso"]');
  results = (query: string): Locator =>
    this.locator(`//*[@data-async-context="query:${query}"]/div`);
}
