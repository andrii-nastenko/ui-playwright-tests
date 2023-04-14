import {faker} from '@faker-js/faker';

export function generateString(len: number): string {
  return faker.random.alphaNumeric(len);
}
