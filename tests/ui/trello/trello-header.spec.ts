import {test} from 'src/fixtures/base';
import {expect} from '@playwright/test';

test.describe('Trello header:', () => {
  const homePageURL = process.env.TRELLO_URL;

  test.beforeEach(async ({trello}) => {
    await trello.page.goto(homePageURL);
  });

  test('Check header and profile button', async ({trello}) => {
    await expect.soft(trello.header.header()).toBeVisible();
    await expect.soft(trello.header.profileBtn()).toBeVisible();
  });

  test('Check user name and email inside header profile menu', async ({trello}) => {
    await trello.header.openProfile();
    const userEmail = await trello.header.getUserInfo('email');
    const userName = await trello.header.getUserInfo('name');

    expect.soft(userEmail).toEqual(process.env.TRELLO_EMAIL);
    expect.soft(userName).toEqual('Andrew');
  });
});
