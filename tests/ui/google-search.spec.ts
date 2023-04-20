import {expect} from '@playwright/test';
import {HomePageActions} from 'src/ui/pages/google/home-page/home-page-actions';
import {ResultsPageSelectors} from 'src/ui/pages/google/results-page/results-page-selectors';
import {DataGenerator} from 'src/helpers/data-generator';
import {HomePageSelectors} from 'src/ui/pages/google/home-page/home-page-selectors';
import {test} from 'fixtures/ui-hooks';

test.describe('Perform google search:', () => {
  const homeURL = process.env.GOOGLE_URL;
  let homePageActions: HomePageActions;
  let homePageSelectors: HomePageSelectors;
  let resultsPageSelectors: ResultsPageSelectors;

  test.beforeAll(async ({browser}) => {
    const context = await browser.newContext();
    const page = await context.newPage();
    homePageActions = new HomePageActions(page);
    homePageSelectors = new HomePageSelectors(page);
    resultsPageSelectors = new ResultsPageSelectors(page);
  });

  test.beforeEach(async () => {
    await homePageActions.goto(homeURL);
  });

  test('Check google search result', async () => {
    const word = DataGenerator.generateWord();
    await homePageActions.enterSearchText(word);

    await expect(homePageSelectors.searchSuggestionsSection()).toBeVisible();

    await homePageActions.startSearch();

    await expect(resultsPageSelectors.searchResultsSection()).toBeVisible();
    expect(await resultsPageSelectors.results(word).count()).toBeGreaterThanOrEqual(1);
  });
});
