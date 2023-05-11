import {test as base} from '@playwright/test';
import {
  type SkipDownloadingFixture,
  skipDownloadFixture,
} from 'src/fixtures/skip-downloading';
import {type TracesFixture, tracesFixture} from 'src/fixtures/traces';
import {type TrelloFixture, trelloFixture} from 'src/fixtures/trello';

/** test instance with fixtures */
const test = base.extend<TrelloFixture & SkipDownloadingFixture & TracesFixture>({
  ...skipDownloadFixture,
  ...tracesFixture,
  ...trelloFixture,
});

export {test};
