// pages/my/my.js
const sessionUtil = require("../../utils/app-session.js");
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    iphoneX: false,
    avatarUrl: '',
    nickName: '',
    level: 1,
    tourist: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      iphoneX: this.getTabBar().data.iPhoneX,
      avatarUrl: sessionUtil.getUserInfoByKey('avatarUrl'),
      nickName: sessionUtil.getUserInfoByKey('nickName'),
      level: sessionUtil.getUserInfoByKey('level')
    })
  },
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    this.setData({
      tourist: app.globalData.tourist
    })
    this.getTabBar().setData({
      _tabbat: 2
    })
  },
  go (e){
    wx.navigateTo({
      url: e.currentTarget.dataset.url
    })
  },
  login: function () {
    wx.navigateTo({
      url: '/pages/auth/auth'
    })
  },
})