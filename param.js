/*
 * $Id: param.js,v 1.00.00 2015/06/16 10:10:32 jennis $
 * can be used to get or set value from URL's query string
 * this script runs in web browser client
 *
 *  Licensed under the MIT license.
 *    http://opensource.org/licenses/mit-license
 *
 */
module.exports = {
	val: function(name, value) {
		var map,
			search = decodeURIComponent(location.search),
			wellIndex = search.indexOf("#") !== - 1 ? search.indexOf("#") : search.length,
			searchStr = search ? search.slice(1, wellIndex) : null,
			pairMap = {},
			toString = pairMap.toString,
			searches = [];
		if (searchStr) {
			var pairs = searchStr.split("&"),
				i = 0,
				len = pairs.length;
			for ( ; i < len ; i++ ) {
				var pair = pairs[i],
					equal = pair.indexOf("=");
				pairMap[ pair.slice(0, equal) ] = pair.slice(equal + 1);
			}
		}
		if (name === undefined) {
			return pairMap;
		} else {
			if (value !== undefined) {
				// add param
				pairMap[ name ] = value;
			} else {
				if (typeof name === "string") {
					return pairMap[ name ] || "";
				} else if (toString.call(name) === "[object Object]") {
					// add multiple params
					for ( var key in name ) {
						pairMap[ key ] = name[ key ];
					}
				} else {
					return "";
				}
			}
		}
		for ( var key in pairMap ) {
			searches.push(key + "=" + pairMap[ key ]);
		}
		location.search = "?" + encodeURIComponent(searches.join("&"));
	}
};
