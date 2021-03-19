// pages/auth/auth.js
const mixin = require("../../utils/page-mixin.js").$pageMixin;
const appUser = require("../../utils/app-user.js");
const app = getApp();
Page(mixin({

    /**
     * 页面的初始数据
     */
    data: {
        id: ''
    },
    onLoad(options) {
        if (options.id) {
            this.setData({
                id: options.id
            })
        }
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
                        const id = beforePage.options.id || that.data.id;
                        const url = id ? '/' + beforePage.route + '?id=' + id : '/' + beforePage.route
                        wx.reLaunch({
                            url: url
                        })
                    });
                }
            }
        });
    }
}))