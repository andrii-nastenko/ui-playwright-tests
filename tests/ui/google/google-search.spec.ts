import {expect} from '@playwright/test';
import {HomePage} from 'src/ui/pages/google/home-page';
import {SearchResultsPage} from 'src/ui/pages/google/search-results-page';
import {test} from 'fixtures/ui-hooks';
import {generateWord} from 'src/helpers/data-generator';

test.describe('Perform google search:', () => {
  const homeURL = process.env.GOOGLE_URL;
  let homePage: HomePage;
  let searchResultsPage: SearchResultsPage;

  test.beforeEach(async ({page}) => {
    homePage = new HomePage(page);
    searchResultsPage = new SearchResultsPage(page);
    await page.goto(homeURL);
  });

  test('Check google search result', async () => {
    const word = generateWord();
    await homePage.enterSearchText(word);

    await expect(
      homePage.searchSuggestionsSection(),
      'expect search suggestions sections to be visible'
    ).toBeVisible();

    await homePage.startSearch();

    await expect
      .soft(
        searchResultsPage.searchResultsSection(),
        'expect search results sections to be visible'
      )
      .toBeVisible();
    expect.soft(await searchResultsPage.results(word).count()).toBeGreaterThanOrEqual(1);
  });
});
