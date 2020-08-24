var _ = require('../utils/underscore-extend.js');

// 通用接口配置	
var commonServiceConfig = {
	
	// 登录接口
	LOGIN : "/login/",

	// 登录接口
	SIG_LIST : "/groups/",

	// 获取sig组已添加成员列表
	SIG_MEMBER_LIST: "/users_include/{id}/",

	// 保存用户giteename
	SAVE_MEMBER_DETAIL: '/user/{id}/'
};



let servicesConfig = _.deepExtend(true, 
	commonServiceConfig
);

module.exports = servicesConfig;