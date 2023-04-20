import {test} from 'fixtures/ui-hooks';
import {DownloadPageActions} from 'src/ui/pages/download-page/download-page-actions';
import {expect} from '@playwright/test';
import {VariousHelpers} from 'src/helpers/various';

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
    const [, buffer] = await downloadPageActions.downloadFile();
    const pdfContent = await VariousHelpers.parsePdf(buffer);

    expect(pdfContent.text).toContain('lorem');
  });
});
