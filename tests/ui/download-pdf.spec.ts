import {test} from 'fixtures/ui-hooks';
import {DownloadPageActions} from 'src/ui/pages/download-page/download-page-actions';
import {expect} from '@playwright/test';
import pdf from 'pdf-parse';

test.describe('Downloads:', () => {
  const filesURL = process.env.FILES_PAGE_URL;
  let downloadPageActions: DownloadPageActions;

  test.beforeAll(async ({browser}) => {
    const context = await browser.newContext();
    const page = await context.newPage();
    downloadPageActions = new DownloadPageActions(page);
  });

  test.beforeEach(async () => {
    await downloadPageActions.goto(filesURL);
    await downloadPageActions.page.waitForLoadState('load');
  });

  test('Download pdf and check its content', async () => {
    const download = await downloadPageActions.downloadFile();
    let data: string;
    const readerStream = await download.createReadStream();
    readerStream?.setEncoding('utf-8');
    readerStream?.on('data', function (chunk: string) {
      data += chunk;
    });
    readerStream?.on('end', function () {
      void pdf(Buffer.from(data)).then((res) => {
        expect(res.info.Creator).toEqual('Aspose Ltd.');
        expect(res.info.Title).toEqual('');
        expect(res.text).toEqual('\n\n');
      });
    });
  });
});
