import {DownloadPage} from 'src/ui/pages/groupdocs/download-page';
import {expect} from '@playwright/test';
import {test} from 'src/helpers/fixtures';
import {parsePdf} from 'src/helpers/helpers';

test.describe('Downloads:', () => {
  const filesURL = process.env.FILES_PAGE_URL;
  let downloadPage: DownloadPage;

  test.beforeAll(async ({browser}) => {
    const page = await browser.newPage();
    downloadPage = new DownloadPage(page);
    await page.goto(filesURL, {waitUntil: 'load'});
  });

  test('Download pdf and check its content', async () => {
    const downloadBtn = downloadPage.downloadBtn();
    const [, buffer] = await downloadPage.downloadFile(downloadBtn);
    const pdfText = await parsePdf(buffer).then(({pages}) =>
      pages.map((page) => page.content.map(({str}) => str).toString()).join()
    );
    expect(pdfText).toContain('lorem');
  });
});
