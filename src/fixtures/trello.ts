import {type Page, type test} from '@playwright/test';
import {LoginPage} from 'src/ui/pages/trello/login-page';
import {Header} from 'src/ui/pages/trello/components/header';
import path from 'path';
import {existsSync} from 'fs';
import {readDataFromJsonFile} from 'src/helpers/file-operations';

export interface TrelloFixture {
  trello: {page: Page; loginPage: LoginPage; header: Header};
}
type TrelloFixtureExtended = Parameters<typeof test.extend<TrelloFixture>>;

/** Trello fixture: authorizes and saves auth state for next tests, initializes page objects. */
const trelloFixture: TrelloFixtureExtended[0] = {
  trello: async ({page}, use: (params: any) => Promise<void>) => {
    const loginPage = new LoginPage(page);
    const header = new Header(page);
    const authFile = path.resolve('setup/auth', `trello.json`);
    if (!existsSync(authFile)) {
      await loginPage.login({
        email: process.env.TRELLO_EMAIL,
        password: process.env.TRELLO_PASSWORD,
      });
      await header.header().waitFor({state: 'visible'});
      await page.context().storageState({path: authFile});
    }
    await page
      .context()
      .addCookies(readDataFromJsonFile('trello.json', 'setup/auth').cookies as []);
    // TODO: delete trello.json after worker is finished
    await use({page, loginPage, header});
  },
};

export {trelloFixture};
