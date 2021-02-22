/**
 * $Id: base64-advanced.js, v1.0.0
 * $Author: dyf19118
 *
 * this script runs in web browser client
 *
 *  Licensed under the MIT license.
 *    http://opensource.org/licenses/mit-license
 *
 */

import { utf8Encoder, utf8Decoder } from "./utf8";

const charset =
  "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";
const isNativelySupported = typeof window.btoa === "function";

export function base64Encoder(rawData) {
  if (!rawData) {
    return "";
  }

  const data = utf8Encoder(rawData);

  if (isNativelySupported) {
    return window.btoa(String.fromCharCode(...data));
  }

  let i = 0,
    len = data.length,
    o1,
    o2,
    o3, // origin three 8-bit number
    tmpBit, // temporary 24-bit number, combined by origin three
    s1,
    s2,
    s3,
    s4, // splited, four 6-bit number
    tmpArr = [],
    arrIndex = 0;
  do {
    o1 = data[i++];
    o2 = data[i++];
    o3 = data[i++];
    // NaN >> x     =>      x-bit 0
    tmpBit = (o1 << 16) | (o2 << 8) | o3;
    // get lower 6 bits
    s1 = (tmpBit >> 18) & 0x3f;
    s2 = (tmpBit >> 12) & 0x3f;
    s3 = (tmpBit >> 6) & 0x3f;
    s4 = tmpBit & 0x3f;
    // 6-bit number's value is between 0 and 63
    tmpArr[arrIndex++] =
      charset.charAt(s1) +
      charset.charAt(s2) +
      charset.charAt(s3) +
      charset.charAt(s4);
  } while (i < len);
  const mod = len % 3;

  if (mod) {
    const lastIndex = tmpArr.length - 1;
    tmpArr[lastIndex] = tmpArr[lastIndex].slice(0, mod - 3) + "===".slice(mod);
  }

  return tmpArr.join("");
}

export function base64Decoder(data) {
  if (!data) {
    return "";
  }

  if (!/^(?:[a-zA-Z\d\+\/=]{4})*$/.test(data)) {
    throw new Error("invalid base64 string");
  }

  if (isNativelySupported) {
    return utf8Decoder(window.atob(data));
  }

  let i = 0,
    len = data.length,
    s1,
    s2,
    s3,
    s4,
    tmpBit,
    o1,
    o2,
    o3,
    utf8ByteArr = [];
  do {
    // encoded chars' index, relative to 65 base64 characters
    s1 = charset.indexOf(data.charAt(i++));
    s2 = charset.indexOf(data.charAt(i++));
    s3 = charset.indexOf(data.charAt(i++));
    s4 = charset.indexOf(data.charAt(i++));
    // these four 6-bit numbers are splited by following three origin 8-bit numbers
    tmpBit = (s1 << 18) | (s2 << 12) | (s3 << 6) | s4;
    // get origin three 8-bit numbers
    o1 = (tmpBit >> 16) & 0xff;
    o2 = (tmpBit >> 8) & 0xff;
    o3 = tmpBit & 0xff;
    if (s3 == 64) {
      utf8ByteArr.push(o1);
    } else if (s4 == 64) {
      utf8ByteArr.push(o1, o2);
    } else {
      utf8ByteArr.push(o1, o2, o3);
    }
  } while (i < len);
  return utf8Decoder(utf8ByteArr);
}
