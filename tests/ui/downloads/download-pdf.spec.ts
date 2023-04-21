import {test} from 'fixtures/ui-hooks';
import {DownloadPage} from 'src/ui/pages/groupdocs/download-page';
import {expect, type Page} from '@playwright/test';
import {Helpers} from 'src/helpers/helpers';

test.describe('Downloads:', () => {
  const filesURL = process.env.FILES_PAGE_URL;
  let page: Page;
  let downloadPage: DownloadPage;

  test.beforeAll(async ({browser}) => {
    const context = await browser.newContext();
    page = await context.newPage();
    downloadPage = new DownloadPage(page);
  });

  test.beforeEach(async () => {
    await page.goto(filesURL);
    await page.waitForLoadState('load');
  });

  test('Download pdf and check its content', async () => {
    const downloadBtn = downloadPage.downloadBtn();
    const [, buffer] = await downloadPage.downloadFile(downloadBtn);
    const pdfContent = await Helpers.parsePdf(buffer);

    expect(pdfContent.text).toContain('lorem');
  });
});
