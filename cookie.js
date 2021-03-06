/*
 * $Id: cookie.js,v 1.00.00 2015/06/16 10:10:32 jennis $
 * 
 * this script runs in web browser client
 *
 *  Licensed under the MIT license.
 *    http://opensource.org/licenses/mit-license
 *
 */
module.exports = {
	defaults: {},
	cookie: function(name, value, options) {
		if (value !== undefined) {
			if (name.match(/\W/)) {
				throw new Error("characters out bounds of [0-9a-zA-Z_] are illegal");
			}
			var options = options || this.defaults;
			if (typeof options.expires === "number") {
				var t = new Date();
				t.setTime(+t + 864e+5 * options.expires);
				return ( document.cookie = [ name, "=", value,
					options.expires ? "; expires=" + t.toGMTString() : "", 
					options.path    ? "; path=" + options.path : "",
					options.domain  ? "; domain=" + options.domain : "",
					options.secure  ? "; secure" : ""
				].join("") );
			}	
		}
		var cookieStr = document.cookie,
			cookies = cookieStr.split(";"),
			i = 0,
			len = cookies.length;
		for ( ; i < len ; i++ ) {
			var cookie = cookies[ i ].trim(),
				equal = cookie.indexOf("=");
			if (cookie.slice(0, equal) === name) {
				return cookie.slice(equal + 1);
			}
		}
		return "";
	},
	add: function(name, value, options) {
		this.cookie(name, value, options);
	},
	get: function(name) {
		return this.cookie(name);
	},
	remove: function(name) {
		this.cookie(name, "invalid", {
			expires: -1
		});
	},
	removeAll: function() {
		var cookieStr = document.cookie,
			cookies = cookieStr.split(";"),
			i = 0,
			len = cookies.length,
			cookieName;
		for( ; i < len ; i++ ) {
			cookieName = cookies[ i ].split("=")[ 0 ] .trim();
			this.remove(cookieName);
		}
	}
};
