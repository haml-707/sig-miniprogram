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
	ADD_MEMBER_LIST: "/groupuser/action/new/",

	// 获取sig组已添加成员列表
	SIG_CLUDE_MEMBER_LIST: "/users_include/{id}/",

	// 获取sig组未添加成员列表
	DEL_MEMBER_LIST: "/groupuser/action/del/",
	
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
	SAVE_MEMBER_DETAIL: '/user/{id}/',

	// 我创建的会议列表
	MY_MEETINGS_LIST: '/mymeetings/',

	// 收藏会议
	COLLECT: '/collect/',

	// 取消收藏
	UNCOLLECT: '/collect/{id}/',

	// 收藏列表
    MY_COLLECT_LIST: '/collections/',
    
    // 获取发起人列表
    ENTERPRISE_MEMBER_LIST: '/sponsors',

    // 获取未添加发起人名单
    ENTERPRISE_EXCLUDE_MEMBER_LIST: '/nonsponsors',

    // 添加发起人
    ENTERPRISE_ADD_MEMBER_LIST: '/sponsor/action/new/',

    // 编辑发起人信息
    ENTERPRISE_SAVE_MEMBER_DETAIL: '/sponsorinfo/{id}/',

    // 删除发起人
    ENTERPRISE_DEL_MEMBER_LIST: '/sponsor/action/del/',

    // 发布
    PUBLISH_EVENT: '/activity/'
};



let servicesConfig = _.deepExtend(true, 
	commonServiceConfig
);

module.exports = servicesConfig;