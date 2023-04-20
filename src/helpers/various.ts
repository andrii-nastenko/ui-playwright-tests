import * as os from 'os';
import fs from 'fs';
import path from 'path';
import {normalizeText} from 'normalize-text';
import pdf from 'pdf-parse';
import moment from 'moment';

class VariousHelpers {
  static wait(ms: number): Promise<void> {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }
  static getLocalUserName(): string {
    return os.userInfo().username;
  }
  static getTextFromFile(fileName: string, paths = 'assets'): string {
    return fs.readFileSync(path.resolve(paths, fileName)).toString();
  }
  static removeInvisibleChars(text: string): string {
    return text.replace(/[^ -~]+/g, '');
  }
  static normalizeText(text: string | string[]): string {
    return normalizeText(text);
  }
  static parsePdf(data: Buffer): Promise<pdf.Result> {
    return pdf(data);
  }
  static getCurrentDate(): string {
    return moment().toISOString();
  }
}

export {VariousHelpers};
