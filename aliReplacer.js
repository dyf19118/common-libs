/*
 * $Id: aliReplacer.js,v 1.00.00 2015/08/08 10:10:32 jennis $
 * 
 * this script runs in web browser client
 * replace sensitive information with sign *
 *
 *  Licensed under the MIT license.
 *    http://opensource.org/licenses/mit-license
 *
 */
module.exports = {
	name: function(str) {
		return str.replace(/\S/, "*");
	},
	phone: function(str) {
		return str.replace(/(\d{3})(\d*)([\d]{4})/, function(match, p1, p2, p3) {
			return [p1, p2.replace(/\d/g, "*"), p3].join("");
		});
	},
	idnum: function(str) {
		return str.replace(/(\d)(\d*)([\dxX])/, function(match, p1, p2, p3) {
			return [p1, p2.replace(/\d/g, "*"), p3].join("");
		});
	}
};