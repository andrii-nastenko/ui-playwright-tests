import {readFileSync, writeFileSync} from 'fs';
import path from 'path';
import {lookup} from 'mime-types';

export function cleanJsonFile(fileName: string, relativeFilePath = 'assets'): void {
  writeFileSync(path.resolve(relativeFilePath, fileName), JSON.stringify({}, null, 2));
}
export function readDataFromJsonFile(
  fileName: string,
  relativeFilePath = 'assets'
): Record<string, unknown> {
  return JSON.parse(readFileSync(path.resolve(relativeFilePath, fileName)).toString());
}
export function writeDataToJSONFile(
  data: unknown,
  fileName: string,
  relativeFilePath = 'assets'
): void {
  writeFileSync(path.resolve(relativeFilePath, fileName), JSON.stringify(data, null, 2));
}
export function getTextFromFile(fileName: string, relativeFilePath = 'assets'): string {
  return readFileSync(path.resolve(relativeFilePath, fileName), {encoding: 'utf8'});
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
  const base64 = readFileSync(fullPath, {encoding: 'base64url'});
  const mimeType = lookup(fullPath);
  if (mimeType && getURI) {
    return `data:${mimeType};base64,${base64}`;
  }
  return base64;
}
