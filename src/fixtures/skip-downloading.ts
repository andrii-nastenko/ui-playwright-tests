import {type test} from '@playwright/test';
import {BaseClass} from 'src/ui/base-class';

export interface SkipDownloadingFixture {
  // eslint-disable-next-line @typescript-eslint/no-invalid-void-type
  skipMediaDownloads: void;
}
type SkipDownloadingFixtureExtended = Parameters<
  typeof test.extend<SkipDownloadingFixture>
>;

/** make pages load faster by skipping images downloading */
const skipDownloadFixture: SkipDownloadingFixtureExtended[0] = {
  skipMediaDownloads: [
    async ({browser}, use) => {
      for (const context of browser.contexts()) {
        for (const page of context.pages()) {
          const baseClass = new BaseClass(page);
          await baseClass.stopRequest('**/*.{png,jpg,jpeg,webp,svg,gif}');
        }
      }
      await use();
    },
    {scope: 'test', auto: true},
  ],
};

export {skipDownloadFixture};
