var _ = require('../utils/underscore-extend.js');

// 通用接口配置	
var commonServiceConfig = {
	
	// 登录接口
	LOGIN : "/login/",

	// 登录接口
	SIG_LIST : "/groups/",

	// 获取sig组已添加成员列表
	SIG_MEMBER_LIST: "/users_include/{id}/",

	// 获取sig组未添加成员列表
	SIG_EXCLUDE_MEMBER_LIST: "/users_exclude/{id}/",

	// 获取sig组未添加成员列表
	ADD_MEMBER_LIST: "/groupuser_new/",

	// 获取sig组已添加成员列表
	SIG_CLUDE_MEMBER_LIST: "/users_include/{id}/",

	// 获取sig组未添加成员列表
	DEL_MEMBER_LIST: "/groupuser_del/",
	
	// 获取sig组未添加成员列表
	GET_USER_GROUP: "/usergroup/{id}/",

	// 创建会议
	SAVE_MEETING: "/meetings/",

	// 获取会议详情
	GET_MEETING_DETAIL: "/meetings/{id}/",

	// 获取当日会议列表
	GET_MEETING_DAILY: "/meetings_daily/",

	// 获取前后一周会议列表
	GET_MEETING_WEEKLY: "/meetings_weekly/",

	// 删除会议
	DEL_MEETING: "/meeting/{id}/",

	// 获取用户状态
	GET_USER_STATUS: "/userinfo/{id}/",

	// 保存用户giteename
	SAVE_MEMBER_DETAIL: '/user/{id}/'
};



let servicesConfig = _.deepExtend(true, 
	commonServiceConfig
);

module.exports = servicesConfig;