// @ts-ignore
import * as JestSorted from 'jest-sorted/src/sorted';
import {expect} from '@playwright/test';

expect.extend(JestSorted);

interface JestSortedTypes {
  /**
   * Checks that an array is sorted according to the passed options
   */
  toBeSorted: (options?: {
    descending?: boolean;
    key?: string;
    coerce?: boolean;
    strict?: boolean;
    compare?: (a?: any, b?: any) => number;
  }) => any;
  /**
   * Checks that an array of objects is sorted according to the passed key and options
   */
  toBeSortedBy: (
    key: string,
    options?: {
      descending?: boolean;
      coerce?: boolean;
      strict?: boolean;
      compare?: (a?: any, b?: any) => number;
    }
  ) => any;
}

export {expect, type JestSortedTypes};
