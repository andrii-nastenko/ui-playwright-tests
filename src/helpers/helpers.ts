import * as system from 'os';
import fs from 'fs';
import path from 'path';
import {normalizeText} from 'normalize-text';
import moment from 'moment';
import {type Readable} from 'stream';
import {lookup} from 'mime-types';
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
export function getTextFromFile(fileName: string, relativeFilePath = 'assets'): string {
  return fs.readFileSync(path.resolve(relativeFilePath, fileName), {encoding: 'utf8'});
}
/**
 * Get Base64 body or data URI (optional) of the file
 * @param {string} fileName full name of the file (including its extension)
 * @param {string} relativeFilePath relative path starting from root directory
 * @param {boolean} getURI if true - returns data URI of a file
 * @returns {string} returns Base64 or URI from chosen file
 */
export function getBase64FromFile(
  fileName: string,
  relativeFilePath = 'assets',
  getURI?: boolean
): string {
  const fullPath = path.resolve(relativeFilePath, fileName);
  const base64 = fs.readFileSync(fullPath, {encoding: 'base64url'});
  const mimeType = lookup(fullPath);
  if (mimeType && getURI) {
    return `data:${mimeType};base64,${base64}`;
  }
  return base64;
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
