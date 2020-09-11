//app.js
var appSession = require("./utils/app-session.js");
App({
  onLaunch: function () {
    var self = this
    wx.getSystemInfo({
      success(res) {
        if (res.model.indexOf('iPhone X') >= 0) {
          self.globalData.iPhoneX = true;
        }
      }
    })
  },
  onShow () {
    this.globalData.isFirstShow = true;
  },
  loginCallback: null,
  globalData: {
    iphoneX: false,
    isFirstShow: true
  }
})