import {type Download, type Locator, type Page} from '@playwright/test';
import {type ActionType} from 'src/ui/types/base-class-types';
import {streamToBuffer} from 'src/helpers/helpers';

/** General custom page methods */
class BaseClass {
  readonly page: Page;
  constructor(page: Page) {
    this.page = page;
  }
  async copySelectedText(): Promise<void> {
    await this.page.evaluate(() => window.document.execCommand('copy'));
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
  async getClasses(locator: Locator): Promise<string[]> {
    return await locator.evaluate((node) => Object.values(node.classList));
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
    const buffer = await streamToBuffer(readerStream);
    return [download, buffer];
  }
  async stopRequest(url: string | RegExp): Promise<void> {
    await this.page.route(url, async (route) => {
      await route.abort();
    });
  }
}

export {BaseClass};
