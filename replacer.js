/*
 * $Id: replacer.js,v 1.00.00 2015/11/23 10:10:32 jennis $
 * 
 * this script runs in web browser client
 * replace sensitive information with sign *
 *
 *  Licensed under the MIT license.
 *    http://opensource.org/licenses/mit-license
 *
 */
module.exports = {
	phone: function(str) {
		return str.replace(/(\d{3})(\d*)(\d{4})/, function(match, p1, p2, p3) {
			return [p1, p2.replace(/\d/g, "*"), p3].join("");
		});
	},
	idnum: function(str) {
		var reg = str.length == 18 ? /(\d{6})(\d*)(\d{3}[\dxX])/ : /(\d{6})(\d*)(\d{3})/;
		return str.replace(reg, function(match, p1, p2, p3) {
			return [p1, p2.replace(/\d/g, "*"), p3].join("");
		});
	}
};