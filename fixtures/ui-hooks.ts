import {test as base} from '@playwright/test';

export const test = base.extend<{sharedBeforeAll: void; sharedBeforeEach: void}>({
  sharedBeforeAll: [
    async ({}, use) => {
      // 'beforeAll' global hook starts here
      await use();
      // 'afterAll' global hook starts here
    },
    // @ts-ignore
    {scope: 'worker', auto: true},
    // starts automatically for every worker (spec) - we pass "auto" for that.
  ],

  sharedBeforeEach: [
    async ({browser}, use) => {
      // 'beforeEach' global hook starts here
      const contexts = browser.contexts();
      for (const context of contexts) {
        await context.tracing.start({screenshots: true, snapshots: true});
        await context.tracing.startChunk({title: test.info().title});
      }
      await use();
      // 'afterEach' global hook starts here
      if (test.info().status === 'failed') {
        for (const context of contexts) {
          await context.tracing.stopChunk({
            path: `traces/${test.info().title}.zip`.replace(/\s/g, '_'),
          });
          for (const page of context.pages()) {
            await page.screenshot({
              path: `screenshots/${test.info().title}.png`.replace(/\s/g, '_'),
              fullPage: true,
            });
          }
        }
      }
      for (const context of contexts) {
        await context.tracing.stop();
      }
    },
    {scope: 'test', auto: true},
    // starts automatically for every test - we pass "auto" for that.
  ],
});
