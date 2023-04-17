import {BaseClass} from 'src/ui/base-class';
import {type Download, type Page} from '@playwright/test';
import {DownloadPageSelectors} from 'src/ui/pages/download-page/download-page-selectors';

export class DownloadPageActions extends BaseClass {
  downloadPageSelectors: DownloadPageSelectors;
  constructor(page: Page) {
    super(page);
    this.downloadPageSelectors = new DownloadPageSelectors(page);
  }
  async downloadFile(): Promise<Download> {
    const [download] = await Promise.all([
      this.page.waitForEvent('download'),
      this.downloadPageSelectors.downloadBtn().click(),
    ]);

    return download;
  }
}
