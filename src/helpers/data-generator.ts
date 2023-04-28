import {faker} from '@faker-js/faker';

export function generateString(length: number): string {
  return faker.random.alphaNumeric(length);
}
export function generateWord(): string {
  return faker.random.word();
}
