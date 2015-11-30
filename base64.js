/*
 * $Id: base64.js,v 1.00.00 2015/06/15 17:10:32 jennis $
 * 
 * this script runs in web browser client
 *
 *  Licensed under the MIT license.
 *    http://opensource.org/licenses/mit-license
 *
 *  References:
 *    https://github.com/kvz/phpjs/blob/master/functions/url/base64_encode.js
 */
module.exports = {
    b64: "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=",
    encode: function(data) {
    	if (!data) {
    		return "";
        }
    	data = encodeURIComponent(data);
        var b64 = this.b64,
            i = 0,
            len = data.length,
            o1, o2, o3, // origin three 8-bit number
            tmpBit, // temporary 24-bit number, combined by origin three
            s1, s2, s3, s4, // splited, four 6-bit number
            tmpArr = [],
            arrIndex = 0;
        do {
            o1 = data.charCodeAt(i++);
            o2 = data.charCodeAt(i++);
            o3 = data.charCodeAt(i++);
            // NaN >> x     =>      x-bit 0
            tmpBit = o1 << 16 | o2 << 8 | o3;
            // get lower 6 bits
            s1 = tmpBit >> 18 & 0x3f;
            s2 = tmpBit >> 12 & 0x3f;
            s3 = tmpBit >> 6 & 0x3f;
            s4 = tmpBit & 0x3f;
            // 6-bit number's value is between 0 and 63
            tmpArr[arrIndex++] = b64.charAt(s1) + b64.charAt(s2) + b64.charAt(s3) + b64.charAt(s4);
        } while ( i < len );
        var str = tmpArr.join(""),
            mod = len % 3;
        return ( mod ? str.slice(0, mod - 3) : str ) + "===".slice( mod || 3 );
    },
    decode: function(data) {
        if (!data) {
            return "";
        }
        if (!/^(?:[a-zA-Z\d\+\/=]{4})*$/.test(data)) {
            throw new Error("invalid base64 string");
        }
        var b64 = this.b64,
            i = 0,
            len = data.length,
            s1, s2, s3, s4,
            tmpBit,
            o1, o2, o3,
            tmpArr = [],
            arrIndex = 0;
        do {
            // encoded chars' index, relative to 65 base64 characters
            s1 = b64.indexOf(data.charAt(i++));
            s2 = b64.indexOf(data.charAt(i++));
            s3 = b64.indexOf(data.charAt(i++)); 
            s4 = b64.indexOf(data.charAt(i++));
            // these four 6-bit numbers are splited by following three origin 8-bit numbers
            tmpBit = s1 << 18 | s2 << 12 | s3 << 6 | s4;
            // get origin three 8-bit numbers
            o1 = tmpBit >> 16 & 0xff;
            o2 = tmpBit >> 8 & 0xff;
            o3 = tmpBit & 0xff;
            if (s3 == 64) {
                tmpArr[arrIndex++] = String.fromCharCode(o1);
            } else if (s4 == 64) {
                tmpArr[arrIndex++] = String.fromCharCode(o1, o2);
            } else {
                tmpArr[arrIndex++] = String.fromCharCode(o1, o2, o3);
            }
        } while ( i < len );
        return decodeURIComponent(tmpArr.join(""));
    }
};