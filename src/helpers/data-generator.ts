import {faker} from '@faker-js/faker';

class DataGenerator {
  static generateString(length: number): string {
    return faker.random.alphaNumeric(length);
  }
}

export {DataGenerator};
