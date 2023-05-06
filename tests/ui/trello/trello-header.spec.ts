import {test} from 'src/helpers/fixtures';
import {LoginPage} from 'src/ui/pages/trello/login-page';
import {Header} from 'src/ui/pages/trello/components/header';
import {expect, type Page} from '@playwright/test';

test.describe('Trello header:', () => {
  let page: Page;
  let loginPage: LoginPage;
  let header: Header;

  test.beforeAll(async ({browser}) => {
    page = await browser.newPage();
    loginPage = new LoginPage(page);
    header = new Header(page);
    await loginPage.login({
      email: process.env.TRELLO_EMAIL,
      password: process.env.TRELLO_PASSWORD,
    });
  });

  test('Check header and profile button', async () => {
    await expect.soft(header.header()).toBeVisible();
    await expect.soft(header.profileBtn()).toBeVisible();
  });

  test('Check user name and email inside header profile menu', async () => {
    await header.openProfile();
    const userEmail = await header.getUserInfo('email');
    const userName = await header.getUserInfo('name');

    expect.soft(userEmail).toEqual(process.env.TRELLO_EMAIL);
    expect.soft(userName).toEqual('Andrew');
  });
});
