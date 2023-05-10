import {type test} from '@playwright/test';

export interface TracesFixture {
  // eslint-disable-next-line @typescript-eslint/no-invalid-void-type
  traces: void;
}
type TracesFixtureExtended = Parameters<typeof test.extend<TracesFixture>>;

/** save traces and screenshot for failed tests */
const tracesFixture: TracesFixtureExtended[0] = {
  traces: [
    async ({browser}, use, testInfo) => {
      /** 'beforeEach' global hook starts here */
      for (const context of browser.contexts()) {
        await context.tracing.start({screenshots: true, snapshots: true});
        await context.tracing.startChunk({title: testInfo.title});
      }
      await use();
      /** 'afterEach' global hook starts here */
      for (const context of browser.contexts()) {
        if (testInfo.status === 'failed') {
          await context.tracing.stopChunk({
            path: `traces/${testInfo.title}.zip`.replace(/\s/g, '_'),
          });
        }
        for (const page of context.pages()) {
          if (testInfo.status === 'failed') {
            await page.screenshot({
              path: `screenshots/${testInfo.title}.png`.replace(/\s/g, '_'),
              fullPage: true,
            });
          }
        }
      }
      for (const context of browser.contexts()) {
        await context.tracing.stop();
      }
    },
    {scope: 'test', auto: true},
  ],
};

export {tracesFixture};
