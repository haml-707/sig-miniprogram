// pages/meeting/meeting.js
const mixin = require("../../utils/page-mixin.js").$pageMixin;
const sessionUtil = require("../../utils/app-session.js");
Page(mixin({

  /**
   * 页面的初始数据
   */
  data: {
    userId: '',
    level: 0,
    iphoneX: false,
    list: [
      '1',
      '2',
      '3',
      '4'
    ]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      iphoneX: this.getTabBar().data.iPhoneX,
      level: sessionUtil.getUserInfoByKey('level'),
      userId: sessionUtil.getUserInfoByKey('userId')
    })
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    this.getTabBar().setData({
      _tabbat: 1
    })
  },
  searchInput: function (e) {

  },
  getAddr: function (e) {
    console.log(e);
  },
  delMeeting: function (e) {
    console.log(e);
  },
}))