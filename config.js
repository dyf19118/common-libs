module.exports = {
	GetDataURL : location.origin + "/support/get_data",
	NET_ERROR : "网络连接错误，请刷新重试！",
	COOKIE_NOT_AVAILABLE : "Cookie当前不可用！请检查浏览器设置",
	rhtml : /^<(?:\s|.)*>$/,
	ModifyCommonUser : {
		ADD : "1",
		UPDATE : "2",
		DELETE : "3"
	},
	BusinessType : {
		REGISTER : "1",
		RESET_PASSWORD : "2",
		CASE_HISTORY : "3",
		RESERVE_RECORD : "4",
		SEE_REPORT : "5"
	},
	Weekdays : ["星期日", "星期一", "星期二", "星期三", "星期四", "星期五", "星期六"],
	SeeTimeStrings : ["上午", "中午", "下午", "夜晚", "早班", "全天"],
	Status : ["已违约", "已取消"],
	DEFAULT_MAX_INTRO_LENGTH : 25,
	MAX_SEARCH_TIMES : 10,
	INFO_IMG_SRC: "http://cms.jiankang51.cn",
	DEFAULT_HOS_LOGO_IMG_SRC: "/assets/" + this.app + "/img/default_hsp_logo.png",
	DEFAULT_DOC_IMG_SRC : "/assets/" + this.app + "/img/default_doc_img.png",
	DEFAULT_HSP_IMG_SRC : "/assets/" + this.app + "/img/default_hsp_img.png",
	NORMAL : "普通号"
};