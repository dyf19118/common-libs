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
				var kv = pairs[i].split("=");
				pairMap[ kv[0] ] = kv[1];
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
					return pairMap[ name ] ? pairMap[ name ] : "";
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