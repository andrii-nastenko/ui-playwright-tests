import {expect} from '@playwright/test';
import {HomePage} from 'src/ui/pages/google/home-page';
import {SearchResultsPage} from 'src/ui/pages/google/search-results-page';
import {DataGenerator} from 'src/helpers/data-generator';
import {test} from 'fixtures/ui-hooks';

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
    const word = DataGenerator.generateWord();
    await homePage.enterSearchText(word);

    await expect(homePage.searchSuggestionsSection()).toBeVisible();

    await homePage.startSearch();

    await expect(searchResultsPage.searchResultsSection()).toBeVisible();
    expect(await searchResultsPage.results(word).count()).toBeGreaterThanOrEqual(1);
  });
});
