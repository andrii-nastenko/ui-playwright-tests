import {DownloadPage} from 'src/ui/pages/group-docs/download-page';
import {test} from 'src/fixtures/base';
import {parsePdf} from 'src/helpers/misc';
import {expect} from '@playwright/test';

test.describe('Downloads:', () => {
  const filesURL = process.env.FILES_PAGE_URL;
  let downloadPage: DownloadPage;

  test.beforeEach(async ({page}) => {
    downloadPage = new DownloadPage(page);
    await page.goto(filesURL, {waitUntil: 'load'});
  });

  test('Download pdf and check its content', async () => {
    const downloadBtn = downloadPage.downloadBtn();
    const [download, buffer] = await downloadPage.downloadFile(downloadBtn);
    const pdfText = await parsePdf(buffer).then(({pages}) =>
      pages.map((page) => page.content.map(({str}) => str).toString()).join()
    );
    expect(await download.path()).not.toBeNull();
    expect(await download.createReadStream()).not.toBeNull();
    expect(download.url()).toContain('download?format=format-pdf&count=3');
    expect(download.suggestedFilename()).toMatch(/^lorem-ipsum-.*pdf$/);
    expect(pdfText).toContain('lorem');
  });
});
