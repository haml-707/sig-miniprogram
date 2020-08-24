/**
 * 常量配置
 */
var _ = require('../utils/underscore-extend.js');

// 服务连接配置
var serviceConfig = {

//  SERVICE_URL: "", // 正式环境
	SERVICE_URL: "http://119.8.32.82", // 测试环境
};

// 存储配置
var storageConfig = {
	APP_USERINFO_SESSION: "_app_userinfo_session"
};

// 所有配置
var constants = _.deepExtend(true,
	serviceConfig,
	storageConfig
);

module.exports = constants;