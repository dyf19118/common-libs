var Config = {
	NET_ERROR : "网络连接错误，请刷新重试！",
	GET_DATA_ERROR: "数据请求异常",
	COOKIE_NOT_AVAILABLE : "Cookie当前不可用！请检查浏览器设置",
	rhtml : /^<(?:\s|.)*>$/,
	IS_WX : /MicroMessenger/i.test(navigator.userAgent),
	ajaxSetting: function(options) {
		// check if third-party library which provides ajax module exists
		options = options || {};
		if (window.$ && $.ajaxSetup) {
			if (sid = require("common-libs/cookie").get("sid")) {
				$.ajaxSetup({
					dataType : "json",
					data: {
						pltId: this.pltId,
						productId: this.productId,
						version: this.version,
						sessionId: sid
					}
				});
			} else {
				// if sidHandler is provided, make it possible to do unique processing
				// redirect to sign_in
				// attention: iterative page redirect should be prevented
				var pageReg = new RegExp("/" + this.app + "/(\\w+)"),
					pageName = location.pathname.match(pageReg)[1],
					redirectPageName = options.redirectPageName || "sign_in";
				if (pageName !== redirectPageName) {
					location.href = this.sidHandler ? this.sidHandler() : (this.IS_WX ? this.getWxAuthPath(redirectPageName) : redirectPageName);
				}
			}
		}
	},
	getFullPath: function(relPath) {
		return [location.origin, this.app, relPath].join("/");
	},
	getWxAuthPath : function(relPath) {
		return "https://open.weixin.qq.com/connect/oauth2/authorize?appid=" + this.wxAppId + "&redirect_uri=" + encodeURIComponent(this.getFullPath(relPath)) + "&response_type=code&scope=snsapi_base#wechat_redirect";
	},
	ModifyCommonUser : {
		ADD : "1",
		UPDATE : "2",
		DELETE : "3"
	},
	RegisterType: {
		REGISTER : "1",
		FETCH: "2",
		CHARGE: "3"
	},
	BusinessType : {
		REGISTER : "1",
		RESET_PASSWORD : "2",
		CASE_HISTORY : "3",
		RESERVE_RECORD : "4",
		SEE_REPORT : "5"
	},
	PayMethod: {
		TELE_FARE: "00",
		ONLINE_PAY: "01",
		UNION_WAP_PAY: "010",
		ALI_PAY: "02",
		WX_PAY: "03",
		OFFLINE_PAY: "05"
	},
	CardTypes: ["医疗卡", "医保卡"],
	ReportPrintStatus: ["未打印", "已打印", "检测中"],
	Status: ["已违约", "已取消", "取号/挂号成功", "预约可取消", "预约不可取消", "可支付", "预约成功", "业务处理中/挂号处理中", "挂号失败", "已退号", "历史挂号记录"],
	Weekdays : ["星期日", "星期一", "星期二", "星期三", "星期四", "星期五", "星期六"],
	SeeTimeStrings : ["上午", "中午", "下午", "夜晚", "早班", "全天"],
	NORMAL : "普通号",
	INFO_IMG_SRC: "http://cms.jiankang51.cn"
};
 module.exports = Config;