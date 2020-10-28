// pages/my/my-collection.js
const sessionUtil = require("../../utils/app-session.js");
var appAjax = require('./../../utils/app-ajax');
let that = null;
let remoteMethods = {
  getCollect: function (_callback) {
    appAjax.postJson({
      autoShowWait: true,
      type: 'GET',
			service: "MY_COLLECT_LIST",
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
  },
  collect: function (id,_callback) {
    appAjax.postJson({
      autoShowWait: true,
      type: 'POST',
			service: "COLLECT",
			data: {
        meeting: id
      },
			success: function(ret) {
				_callback && _callback(ret);
			}
		});
  },
  uncollect: function (id,_callback) {
    appAjax.postJson({
      autoShowWait: true,
      type: 'DELETE',
			service: "UNCOLLECT",
			otherParams: {
        id: id
      },
			success: function(ret) {
				_callback && _callback(ret);
			}
		});
  }
}
Page({

  /**
   * 页面的初始数据
   */
  data: {
    curMid: '',
    curJoinUrl: '',
    cellInstance: null,
    delId: '',
    copy: '',
    userId: '',
    list: [],
    showDialog: false,
    showDialogDel: false
  },
  onShow: function () {
    that = this;
    remoteMethods.getCollect(function (data) {
      that.setData({
        list: data,
        userId: sessionUtil.getUserInfoByKey('userId'),
        level: sessionUtil.getUserInfoByKey('level')
      })
    })
  },
  collect: function (e) {
    remoteMethods.uncollect(e.currentTarget.dataset.collect, function (res) {
        remoteMethods.getCollect(function (data) {
          that.data.cellInstance.close();
          that.setData({
            list: data
          })
        })
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
        remoteMethods.getCollect(function (data) {
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
  }
})