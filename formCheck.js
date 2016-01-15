/*
 * $Id: formCheck.js,v 1.00.00 2015/06/16 10:10:32 jennis $
 * this plugin is Chinese-Oriented
 * this script runs in web browser client
 *
 *  Licensed under the MIT license.
 *    http://opensource.org/licenses/mit-license
 *
 */
module.exports = {
	/* alike check */
	idnumAlike: function(input) {
		return /(^\d{17}[\dxX]$)|(^\d{15}$)/.test(input);
	},
	isAdult: function(idnum) {
		if (this.idnumAlike(idnum)) {
			var rIdnum15 = /^\d{6}(\d{6})\d{3}$/,
				rIdnum18 = /^\d{6}(\d{8})[\dxX]{4}$/,
				birth;
			birth = idnum.length === 18 ? idnum.match(rIdnum18) : idnum.match(rIdnum15);
			if (birth && (birth = birth[1])) {
				var threshold = new Date(),
					year = idnum.length === 18 ? birth.slice(-8, -4) : "19" + birth.slice(-6, -4);
				threshold.setDate(birth.slice(-2));
				threshold.setMonth(+birth.slice(-4, -2) - 1);
				threshold.setYear(+year + 18);
				return +threshold <= +(new Date());
			}
		}
		return false;
	},
	/* form check */
	name: function(input, bRet) {
		var retInfo = {
			flag: false,
			msg: ""
		};
		if (!input) {
			retInfo.msg = "用户姓名不得为空";
		} else if (!/^[\u4e00-\u9fa5]{2,6}$/.test(input)) {
			retInfo.msg = "用户姓名应为2-6个中文汉字";
		} else {
			retInfo.flag = true;
		}
		return bRet ? retInfo : retInfo.flag;
	},
	phone: function(input, bRet) {
		var retInfo = {
			flag: false,
			msg: ""
		};
		if (!input) {
			retInfo.msg = "手机号不得为空";
		} else if (!/^\d{11}$/.test(input)) {
			retInfo.msg = "请输入有效手机号";
		} else {
			retInfo.flag = true;
		}
		return bRet ? retInfo : retInfo.flag;
	},
	idnum: function(input, bRet) {
		var retInfo = {
			flag: false,
			msg: ""
		};
		if (!input) {
			retInfo.msg = "身份证号不得为空";
		} else if (/^\d{17}[\dxX]$/.test(input)) {
			var Wi = [7,9,10,5,8,4,2,1,6,3,7,9,10,5,8,4,2],
				verifyCharcodeMap = [1,0,'x',9,8,7,6,5,4,3,2],
				S = 0,
				i = 0;
			for ( ; i < 17 ; i++ ) {
				S += Wi[i] * +input[i];
			}
			if (input[17].toLowerCase() == verifyCharcodeMap[S % 11]) {
				retInfo.flag = true;
			} else {
				retInfo.msg = "请输入有效身份证号码";
			}
		} else if (/^\d{15}$/.test(input)) {
			retInfo.flag = true;
		} else {
			retInfo.msg = "请输入有效身份证号码";
		}
		return bRet ? retInfo : retInfo.flag;
	},
	account: function(input, bRet) {
		var retInfo = {
			flag: false,
			msg: ""
		};
		if (this.idnumAlike(input)) {
			return this.idnum(input, bRet);
		} else {
			if (!input) {
				retInfo.msg = "账号不得为空";
			} else {
				// 南通平台的校验规则
				/*if (/\d/.test(input) && /[a-zA-Z]/.test(input) && /^[0-9a-zA-Z@,]{6,16}$/.test(input)) {
					retInfo.flag = true;
				} else {
					retInfo.msg = "用户名只能由6至16位的字母、数字和'@'、','符号组成";
				}*/
				retInfo.flag = true;
			}
		}
		return bRet ? retInfo : retInfo.flag;
	},
	pwd: function(input, bRet) {
		var retInfo = {
			flag: false,
			msg: ""
		};
		if (!input) {
			retInfo.msg = "密码不得为空";
		} else if (!/^.{6,30}$/.test(input)) {
			retInfo.msg = "密码长度应为6-30";
		} else {
			retInfo.flag = true;
		}
		return bRet ? retInfo : retInfo.flag;
	},
	confirm: function(input, pwd, bRet) {
		var retInfo = {
			flag: false,
			msg: ""
		};
		if (pwd) {
			if (!input) {
				retInfo.msg = "请再次输入登陆密码";
			} else if (input !== pwd) {
				retInfo.msg = "两次输入的密码不一致";
			} else {
				retInfo.flag = true;
			}
		}
		return bRet ? retInfo : retInfo.flag;
	},
	code: function(input, bRet) {
		var retInfo = {
			flag: false,
			msg: ""
		};
		if (!input) {
			retInfo.msg = "短信验证码不得为空";
		} else {
			retInfo.flag = true;
		}
		return bRet ? retInfo : retInfo.flag;
	},
	guarderIdnum: function(input, bRet) {
		var retInfo = {
			flag: false,
			msg: ""
		};
		if (!input) {
			retInfo.msg = "监护人身份证不得为空";
		} else if (!(this.isAdult(input) && this.idnum(input))) {
			retInfo.msg = "请输入有效监护人身份证号码";
		} else {
			retInfo.flag = true;
		}
		return bRet ? retInfo : retInfo.flag;
	}
};