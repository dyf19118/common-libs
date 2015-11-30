var cookie = require("./cookie");
module.exports = {
	// 由于安卓微信退出会清空localStorage因此取消localStorage存储
	bLS: !!window.localStorage && !/android/i.test(navigator.userAgent),
//	rPath: /(\/(?:\S+\/)*)(\S*)/,
	add: function(name, val, options) {
		return this.bLS ? localStorage.setItem(name, val) : cookie.add(name, val, options);
	},
	get: function(name) {
		return this.bLS ? localStorage.getItem(name) : cookie.get(name);
	},
	remove: function(name) {
		return this.bLS ? localStorage.removeItem(name) : cookie.remove(name);
	},
	clear: function() {
		return this.bLS ? localStorage.clear() : cookie.removeAll();
	}
};