// pages/auth/auth.js
const mixin = require("../../utils/page-mixin.js").$pageMixin;
const appUser = require("../../utils/app-user.js");
const app = getApp();
Page(mixin({

    /**
     * 页面的初始数据
     */
    data: {

    },
    onShow() {

    },
    /**
     * 绑定获取用户信息
     */
    bindGetUserInfo: function (e) {
        let that = this;

        wx.getSetting({
            success: function (res) {

                if (res.authSetting['scope.userInfo']) {
                    appUser.wxLogin(function (result) {
                        const pages = getCurrentPages(); // 当前页面
                        const beforePage = pages[pages.length - 2]; // 前一个页面
                        const url = beforePage.options.id ? '/' + beforePage.route + '?id=' + beforePage.options.id : '/' + beforePage.route
                        wx.reLaunch({
                            url: url
                        })
                    });
                }
            }
        });
    }
}))