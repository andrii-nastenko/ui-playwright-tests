import {BaseClass} from 'src/ui/base-class';
import {type Download, type Page} from '@playwright/test';
import {DownloadPageSelectors} from 'src/ui/pages/download-page/download-page-selectors';
import {VariousHelpers} from 'src/helpers/various';

export class DownloadPageActions extends BaseClass {
  downloadPageSelectors: DownloadPageSelectors;
  constructor(page: Page) {
    super(page);
    this.downloadPageSelectors = new DownloadPageSelectors(page);
  }
  async downloadFile(): Promise<[Download, Buffer]> {
    const [download] = await Promise.all([
      this.page.waitForEvent('download'),
      this.downloadPageSelectors.downloadBtn().click(),
    ]);
    const readerStream = await download.createReadStream();
    if (!readerStream) {
      throw new Error('file download failed');
    }
    const buffer = await VariousHelpers.streamToBuffer(readerStream);
    return [download, buffer];
  }
}
