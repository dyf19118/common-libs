/*
 * $Id: dateUtils.js,v 1.00.00 2015/06/16 10:10:32 jennis $
 * 
 * this script runs in web browser client
 *
 *  Licensed under the MIT license.
 *    http://opensource.org/licenses/mit-license
 *
 */
Date.prototype.format = function(format, delim) {
	var delim = delim || format.match(/[^\w]/)[0],
		splits = format.split(delim),
		i = 0,
		len = splits.length,
		formatMap = {
			/* this map can be extended */
			"yyyy": this.getFullYear(),
			"mm": this.getMonth() + 1,
			"dd": this.getDate()
		};
	for ( ; i < len ; i++ ) {
		var key = splits[i],
			val = formatMap[key];
		if (val) {	
			format = format.replace(key, val < 10 ? "0" + val : val);
		} else {
			continue;
		}
	}
	return format;
}
String.prototype.toDate = function(delim) {
	// transform date format string to Date
	// only support Date with format like yyyy-mm-dd
	var tmp = new Date();
	if (/^\d*$/.test(this)) {
		tmp.setDate(this.slice(6, 8));
		tmp.setMonth(parseInt(this.slice(4, 6)) - 1);
		tmp.setFullYear(this.slice(0, 4));
	} else {
		delim = delim || this.match(/[^\w]/)[0];
		if (delim) {
			var splits = this.split(delim);
			tmp.setDate(splits[2]);
			tmp.setMonth(parseInt(splits[1]) - 1);
			tmp.setFullYear(splits[0]);
		}
	}
	return tmp;
}