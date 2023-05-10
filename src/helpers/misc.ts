import system from 'os';
import {normalizeText} from 'normalize-text';
import {PDFExtract, type PDFExtractResult} from 'pdf.js-extract';
import {type Readable} from 'stream';

export async function wait(ms: number): Promise<void> {
  await new Promise((resolve) => setTimeout(resolve, ms));
}
export function getLocalUserName(): string {
  return system.userInfo().username;
}
export function getOS(): NodeJS.Platform {
  return system.platform();
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
