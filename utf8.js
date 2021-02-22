/*
 * $Id: utf8.js, v1.0.0
 * $Author: dyf19118
 * 
 * this script runs in all javascript environments that support es6 syntax, or transpiles it into es5 before executing
 *
 *  Licensed under the MIT license.
 *    http://opensource.org/licenses/mit-license
 *
 */

function utf8Encoder(str) {
  // encode str with utf-8 encoding, in other words, convert utf-16 code units to utf-8 code units. for the purpose of easy byte string operation.
  // * how utf-16 works:
  // javascript characters are internally encoded as UTF-16 code points, each code point consists one or two 16 bits code units.
  // for those non-BMP code points of which code starts from 0x10000, are made up of two code units called a surrogate pair,
  // code point is defined to no greater than 0x10FFFF, subtract each of those non-BMP code points by 0x10000 and get the 20 bits sit between 0x00000-0xFFFFF,
  // a surrogate pair consists a leading surrogate(high 10 bits, sits between 0xD800-0xDBFF) and a trailing surrogate(low 10 bits, sits between 0xDC00-0xDFFF),
  // in other words, possible combinations of each ten 10 bits can represent all those non-BMP characters, 1024 * 1024 === 0x10FFFF - 0x10000 + 1.
  // leading surrogate, trailing surrogate and valid BMP characters that sit between 0x0000-0xD7FF and 0xE000-0xFFFF are disjoint,
  // as a result, it's easy to find where a surrogate pair occurs.
  // it's the story of utf-16.
  // * how utf-8 variable-length encoding works:
  // count of leading bit 1 represents how many bytes are needed to encode this character.
  // code points from 0-127: 0ccccccc
  // 128-2047（10{7}-1{11}）: 110ccccc 10cccccc
  // 2048-65535（10{11}-1{16}）: 1110cccc 10cccccc 10cccccc
  // 65536-0x10FFFF（the largest code point defined by unicode, takes up to 21 bits）：11110ccc 10cccccc 10cccccc 10cccccc

  const len = str.length;
  const arr = [];

  for (let i = 0; i < len; i++) {
    // get utf-16 unit（including surrogates）
    const charUnit = str[i];

    // for code units, charCodeAt(0) equals to codePointAt(0)
    const charUnitCode = charUnit.charCodeAt(0);

    if (charUnitCode > 2047) {
      // * need 3 bytes to encode
      // byte1: bit13-16, byte2: bit7-12, byte3: bit1-6
      arr.push(
        ((charUnitCode >>> 12) & 0b1111) | 0b11100000,
        ((charUnitCode >>> 6) & 0b111111) | 0b10000000,
        (charUnitCode & 0b111111) | 0b10000000
      );
    } else if (charUnitCode > 127) {
      // * need 2 bytes to encode
      // byte1: bit 7-11, byte2: bit 1-6
      arr.push(
        ((charUnitCode >>> 6) & 0b11111) | 0b11000000,
        (charUnitCode & 0b111111) | 0b10000000
      );
    } else {
      arr.push(charUnitCode);
    }
  }

  return arr;
}

function utf8Decoder(arr) {
  // convert utf-8 bytes to utf-16 code units
  const len = arr.length;
  const charUnitCodes = [];
  let i = 0;
  while (i < len) {
    const utf8Byte = arr[i];
    if (utf8Byte >= 0b11100000) {
      // * encoded with 3 bytes
      // first 4bits
      const first = (utf8Byte & 0b1111) << 12;
      // second 6bits
      const second = (arr[i + 1] & 0b111111) << 6;
      // third 6bits
      const third = arr[i + 2] & 0b111111;
      charUnitCodes.push(first | second | third);
      i += 3;
    } else if (utf8Byte >= 0b11000000) {
      // * encoded with 2 bytes
      // first 5bits
      const first = (utf8Byte & 0b11111) << 6;
      // second 6bits
      const second = arr[i + 1] & 0b111111;
      charUnitCodes.push(first | second);
      i += 2;
    } else {
      charUnitCodes.push(utf8Byte);
      i += 1;
    }
  }

  return String.fromCharCode(...charUnitCodes);
}
