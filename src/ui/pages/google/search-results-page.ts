import {BaseClass} from 'src/ui/base-class';
import {type Locator} from '@playwright/test';

class SearchResultsPage extends BaseClass {
  searchResultsSection = (): Locator => this.page.locator('//div[@id="rso"]');
  results = (query: string): Locator =>
    this.page.locator(`//*[@data-async-context="query:${query}"]/div`);
}

export {SearchResultsPage};
