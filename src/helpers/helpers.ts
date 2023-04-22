import * as system from 'os';
import fs from 'fs';
import path from 'path';
import {normalizeText} from 'normalize-text';
import pdf from 'pdf-parse';
import moment from 'moment';
import {type Readable} from 'stream';

class Helpers {
  static wait(ms: number): Promise<void> {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }
  static getLocalUserName(): string {
    return system.userInfo().username;
  }
  static getOS(): NodeJS.Platform {
    return system.platform();
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
  static streamToBuffer(stream: Readable): Promise<Buffer> {
    return new Promise<Buffer>((resolve) => {
      const _buf = Array<any>();
      stream.on('data', (chunk) => _buf.push(chunk));
      stream.on('end', () => {
        resolve(Buffer.concat(_buf));
      });
    });
  }
  static getCurrentISODate(): string {
    return moment().toISOString();
  }
  static tomorrowDateFormatted(): string {
    return moment().add(1, 'days').format('YYYY-MM-DD');
  }
  static yesterdayDateFormatted(): string {
    return moment().subtract(1, 'days').format('YYYY-MM-DD');
  }
}

export {Helpers};
