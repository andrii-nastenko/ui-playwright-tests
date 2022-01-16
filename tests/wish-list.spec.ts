import { test, expect } from '@playwright/test';
import { WishlistPage } from '../pageObjects/wishlist-page';
import { TopHeader } from '../pageObjects/top-header';
import { actions } from '../helpers/common-actions';

test.describe('Wish list:', () => {
  test.use({ storageState: 'storageState.json' });

  test('Wish list should contain PlayStation 5', async ({ page }) => {
    const header = new TopHeader(page);
    const wishList = new WishlistPage(page);

    await actions.goto(page);
    await header.wishListClick();

    await expect(wishList.items).toContainText('PS5 PlayStation 5 Digital Edition');
  });
});
