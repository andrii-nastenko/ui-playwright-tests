import {faker} from '@faker-js/faker';

export function generateLoremWord(length?: number): string {
  return faker.lorem.word(length);
}
