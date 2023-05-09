import {type test} from '@playwright/test';
import {BaseClass} from 'src/ui/base-class';

export interface SkipDownloadFixture {
  // eslint-disable-next-line @typescript-eslint/no-invalid-void-type
  skipMediaDownloads: void;
}
type SkipDownloadFixtureExtended = Parameters<typeof test.extend<SkipDownloadFixture>>;

const skipDownloadFixture: SkipDownloadFixtureExtended[0] = {
  skipMediaDownloads: [
    async ({browser}, use) => {
      for (const context of browser.contexts()) {
        for (const page of context.pages()) {
          /** make pages load faster by skipping images and fonts downloading */
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
