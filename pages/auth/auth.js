// pages/auth/auth.js
const mixin = require("../../utils/page-mixin.js").$pageMixin;
const appUser = require("../../utils/app-user.js");
Page(mixin({

  /**
   * 页面的初始数据
   */
  data: {

  },
  onShow () {

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
            wx.switchTab({
              url: '/pages/index/index'
            })
          });
        }
      }
    });
  }
}))