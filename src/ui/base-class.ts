import {type Download, type Locator, type Page} from '@playwright/test';
import {Helpers} from 'src/helpers/helpers';
import {type ActionType} from 'src/ui/types/base-class-types';

class BaseClass {
  readonly page: Page;
  constructor(page: Page) {
    this.page = page;
  }
  async press(
    action: ActionType,
    options?: {delay?: number | undefined} | undefined
  ): Promise<void> {
    await this.page.keyboard.press(
      process.env.CI ? action.replace('Meta', 'Control') : action,
      options
    );
  }
  async copySelectedText(): Promise<void> {
    await this.page.evaluate(() => window.document.execCommand('copy'));
  }
  /** Download file after clicking a button. Returns Download and file Buffer */
  async downloadFile(downloadBtn: Locator): Promise<[Download, Buffer]> {
    const [download] = await Promise.all([
      this.page.waitForEvent('download'),
      downloadBtn.click(),
    ]);
    const readerStream = await download.createReadStream();
    if (!readerStream) {
      throw new Error('file download failed');
    }
    const buffer = await Helpers.streamToBuffer(readerStream);
    return [download, buffer];
  }
}

export {BaseClass};
