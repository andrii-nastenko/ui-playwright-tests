import {BaseClass} from 'src/ui/base-class';
import {type Locator} from '@playwright/test';

class DownloadPage extends BaseClass {
  downloadBtn = (): Locator => this.page.locator('//*[@id="download-btn"]');
}

export {DownloadPage};
