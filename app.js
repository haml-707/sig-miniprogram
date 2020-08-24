//app.js
var appSession = require("./utils/app-session.js");
App({
  onLaunch: function () {
    var self = this
    wx.getSystemInfo({
      success(res) {
        console.log(res.model)
        if (res.model.indexOf('iPhone X') >= 0) {
          self.globalData.iPhoneX = true;
        }
      }
    })
  },
  onShow () {
  },
  loginCallback: null,
  globalData: {
    iphoneX: false
  }
})