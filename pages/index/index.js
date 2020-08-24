//index.js
const mixin = require("../../utils/page-mixin.js").$pageMixin;
const sessionUtil = require("../../utils/app-session.js");
let that = null;
let localMethods = {
  getCurText () {
    var timestamp = Date.parse(new Date());
    timestamp = timestamp / 1000;
    var n = timestamp * 1000;
    var date = new Date(n);
    var h = date.getHours();
    var m = date.getMinutes();
    var hm = parseFloat(h+'.' +m);
    if(23 < hm || hm <=6){
      that.setData({
        text: '请睡吧'
      });
    }
    if(6 < hm && hm <=12){
      that.setData({
        text: '上午好'
      });
    }
    if(12 < hm && hm <=14){
      that.setData({
        text: '中午好'
      });
    }
    if(14 < hm && hm <=18){
      that.setData({
        text: '下午好'
      });
    }
    if(18 < hm && hm <=23){
      that.setData({
        text: '晚上好'
      });
    }
  }
}
Page(mixin({
  data: {
    userId: "",
    level: 0,
    text: '',
    avatarUrl: sessionUtil.getUserInfoByKey('avatarUrl'),
    nickName: sessionUtil.getUserInfoByKey('nickName'),
    imgUrls: [
      './../../static/index/swiper1.png',
      './../../static/index/swiper2.png',
      './../../static/index/swiper3.png'
    ],
    list: [
      '1',
      '2',
      '3',
      '4'
    ],
    iphoneX: false,
    showDialog: false,
    showDialogDel: false
  },
  onLoad: function () {
    that = this;
    localMethods.getCurText();
    this.setData({
      iphoneX: this.getTabBar().data.iPhoneX,
      level: sessionUtil.getUserInfoByKey('level'),
      avatarUrl: sessionUtil.getUserInfoByKey('avatarUrl'),
      nickName: sessionUtil.getUserInfoByKey('nickName'),
      userId: sessionUtil.getUserInfoByKey('userId')
    })
  },
  getAddr: function (e) {
    console.log(e);
    this.setData({
      showDialog: true
    })
    
  },
  copyLink: function () {
    this.setData({
      showDialog: false
    })
  },
  copyId: function () {
    this.setData({
      showDialog: false
    })
  },
  closeDialog: function () {
    this.setData({
      showDialog: false
    })
  },
  delMeeting: function (e) {
    this.setData({
      showDialogDel: true
    })
  },
  del: function () {
    this.setData({
      showDialogDel: false
    })
  },
  delCancel: function () {
    this.setData({
      showDialogDel: false
    })
  },
  toDetail: function () {
    wx.navigateTo({
      url: '/pages/meeting/detail'
    })
  },
  swithTabMeeting: function () {
    wx.switchTab({
      url: '/pages/meeting/meeting'
    })
  },
  navigateTo: function (e) {
    wx.navigateTo({
      url: e.currentTarget.dataset.url
    })
  },
  onShow: function () {
    this.getTabBar().setData({
      _tabbat: 0
    })
  }
}))
