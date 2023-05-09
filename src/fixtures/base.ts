import {test as base} from '@playwright/test';
import {type SkipDownloadFixture, skipDownloadFixture} from 'src/fixtures/skip-download';
import {type TracesFixture, tracesFixture} from 'src/fixtures/traces';
import {type TrelloFixture, trelloFixture} from 'src/fixtures/trello';

const test = base.extend<TrelloFixture & SkipDownloadFixture & TracesFixture>({
  ...skipDownloadFixture,
  ...tracesFixture,
  ...trelloFixture,
});

export {test};
