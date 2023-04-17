import {faker} from '@faker-js/faker';
import * as fs from 'fs';
import * as path from 'path';

export class DataGenerator {
  static generateString(length: number): string {
    return faker.random.alphaNumeric(length);
  }
  static getTextFromFile(fileName: string): string {
    return fs.readFileSync(path.resolve('setup/files', fileName)).toString();
  }
  static removeInvisibleChars(text: string): string {
    return text.replace(/[^ -~]+/g, '');
  }
}
