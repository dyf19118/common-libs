/*
 * $Id: stringUtils.js,v 1.00.00 2015/06/16 10:10:32 jennis $
 * 
 * this script runs in web browser client
 *
 *  Licensed under the MIT license.
 *    http://opensource.org/licenses/mit-license
 *
 */
if (!String.prototype.startsWith) {
	String.prototype.startsWith = function(str) {
		return this.slice(0, str.length) == str;
	}
}