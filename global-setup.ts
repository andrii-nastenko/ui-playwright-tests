import { chromium } from '@playwright/test';
import { AuthModal } from './pageObjects/auth-modal';
import { TopHeader } from './pageObjects/top-header';
import { actions } from './helpers/common-actions';

async function globalSetup() {
  const browser = await chromium.launch();
  const page = await browser.newPage();

  const header = new TopHeader(page);
  const authModal = new AuthModal(page);

  await actions.goto(page);
  await header.userBtnClick();
  await authModal.singIn();

  await page.context().storageState({ path: 'storageState.json' });
  await browser.close();
}

export default globalSetup;
