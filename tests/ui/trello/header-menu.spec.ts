import {test} from 'src/fixtures/base';
import {expect} from '@playwright/test';

test.describe('Trello header menu:', () => {
  const homePageURL = process.env.TRELLO_URL;
  const userName = process.env.TRELLO_USER_NAME;
  const userEmail = process.env.TRELLO_EMAIL;

  test.beforeEach(async ({trello}) => {
    await trello.page.goto(homePageURL);
  });

  test('Check header and profile button', async ({trello}) => {
    await expect.soft(trello.header.header()).toBeVisible();
    await expect.soft(trello.header.profileBtn()).toBeVisible();
  });

  test('Check user name and email from header profile menu', async ({trello}) => {
    await trello.header.openProfile();
    const receivedUserEmail = await trello.header.getUserInfo('email');
    const receivedUserName = await trello.header.getUserInfo('name');

    expect.soft(userEmail).toEqual(receivedUserEmail);
    expect.soft(userName).toEqual(receivedUserName);
  });
});
