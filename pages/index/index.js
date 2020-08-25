//index.js
const mixin = require("../../utils/page-mixin.js").$pageMixin;
const sessionUtil = require("../../utils/app-session.js");
var appAjax = require('./../../utils/app-ajax');
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
let remoteMethods = {
  getMettingDaily: function (_callback) {
    appAjax.postJson({
      autoShowWait: true,
      type: 'GET',
			service: "GET_MEETING_DAILY",
			success: function(ret) {
				_callback && _callback(ret);
			}
		});
  },
  delMeeting: function (id,_callback) {
    appAjax.postJson({
      autoShowWait: true,
      type: 'DELETE',
			service: "DEL_MEETING",
			otherParams: {
        id: id
      },
			success: function(ret) {
				_callback && _callback(ret);
			}
		});
  }
}
Page(mixin({
  data: {
    curMid: '',
    curJoinUrl: '',
    cellInstance: null,
    delId: '',
    copy: '',
    userId: '',
    level: 0,
    text: '',
    avatarUrl: sessionUtil.getUserInfoByKey('avatarUrl'),
    nickName: sessionUtil.getUserInfoByKey('nickName'),
    imgUrls: [
      './../../static/index/swiper1.png',
      './../../static/index/swiper2.png',
      './../../static/index/swiper3.png'
    ],
    list: [],
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
    this.setData({
      showDialog: true,
      curMid: e.currentTarget.dataset.id,
      curJoinUrl: e.currentTarget.dataset.addr
    })
    
  },
  copyLink: function () {
    wx.setClipboardData({
      data: this.data.curJoinUrl,
      success: function (res) {
        that.data.cellInstance.close();
        that.setData({
          showDialog: false
        })
      }
    })
    
  },
  copyId: function () {
    wx.setClipboardData({
      data: this.data.curMid,
      success: function (res) {
        that.data.cellInstance.close();
        that.setData({
          showDialog: false
        })
      }
    })
  },
  closeDialog: function () {
    this.setData({
      showDialog: false
    })
  },
  delMeeting: function (e) {
    this.setData({
      delId: e.currentTarget.dataset.id
    })
    this.setData({
      showDialogDel: true
    })
  },
  del: function () {
    remoteMethods.delMeeting(this.data.delId, function (data) {
      if(data.code == 204){
        that.setData({
          showDialogDel: false
        })
        remoteMethods.getMettingDaily(function (data) {
          that.data.cellInstance.close();
          that.setData({
            list: data
          })
        })
      }
    })
  },
  onClose: function (e) {
    this.setData({
      cellInstance: e.detail.instance
    })
  },
  delCancel: function () {
    this.setData({
      showDialogDel: false
    })
  },
  toDetail: function (e) {
    wx.navigateTo({
      url: '/pages/meeting/detail?id=' + e.currentTarget.dataset.id
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
    remoteMethods.getMettingDaily(function (data) {
      that.setData({
        list: data
      })
    })
  }
}))
