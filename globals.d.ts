import {type JestSortedTypes} from 'config/matchers';

declare global {
  namespace NodeJS {
    type ProcessEnv = Record<string, string>;
  }
  namespace PlaywrightTest {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    interface Matchers<R, T> extends JestSortedTypes {}
  }
}

export {};
