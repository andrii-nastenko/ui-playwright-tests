import {BaseClass} from 'src/ui/base-class';
import {type Locator, type Page} from '@playwright/test';

export class DownloadPageSelectors extends BaseClass {
  constructor(page: Page) {
    super(page);
  }
  downloadBtn = (): Locator => this.locator('//*[@id="download-btn"]');
}
