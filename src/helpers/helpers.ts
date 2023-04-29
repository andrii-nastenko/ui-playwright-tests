import * as system from 'os';
import fs from 'fs';
import path from 'path';
import {normalizeText} from 'normalize-text';
import moment from 'moment';
import {type Readable} from 'stream';
import {PDFExtract, type PDFExtractResult} from 'pdf.js-extract';

export async function wait(ms: number): Promise<void> {
  await new Promise((resolve) => setTimeout(resolve, ms));
}
export function getLocalUserName(): string {
  return system.userInfo().username;
}
export function getOS(): NodeJS.Platform {
  return system.platform();
}
export function getTextFromFile(fileName: string, paths = 'assets'): string {
  return fs.readFileSync(path.resolve(paths, fileName)).toString();
}
export function removeInvisibleChars(text: string): string {
  return normalizeText(text.replace(/[^ -~]+/g, ''));
}
export function parsePdf(data: Buffer): Promise<PDFExtractResult> {
  return new PDFExtract().extractBuffer(data);
}
export function streamToBuffer(stream: Readable): Promise<Buffer> {
  return new Promise<Buffer>((resolve) => {
    const _buf = Array<any>();
    stream.on('data', (chunk) => _buf.push(chunk));
    stream.on('end', () => {
      resolve(Buffer.concat(_buf));
    });
  });
}
export function getCurrentISODate(): string {
  return moment().toISOString();
}
export function tomorrowDateFormatted(): string {
  return moment().add(1, 'days').format('YYYY-MM-DD');
}
export function yesterdayDateFormatted(): string {
  return moment().subtract(1, 'days').format('YYYY-MM-DD');
}
