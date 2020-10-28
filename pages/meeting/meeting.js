// pages/meeting/meeting.js
const mixin = require("../../utils/page-mixin.js").$pageMixin;
const sessionUtil = require("../../utils/app-session.js");
const appUser = require("../../utils/app-user.js");
var appAjax = require('./../../utils/app-ajax');
let that = null;
let remoteMethods = {
  getMettingWeekly: function (_callback) {
    appAjax.postJson({
      autoShowWait: true,
      type: 'GET',
			service: "GET_MEETING_WEEKLY",
			success: function(ret) {
				_callback && _callback(ret);
			}
		});
  },
  getSigList: function (_callback) {
    appAjax.postJson({
      type: 'GET',
			service: "SIG_LIST",
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
let localMethod = {
  filterData: function () {
    let listTemp = [];
    if(that.data.curFilterSigId === '' && that.data.curKeyword === ''){
      that.setData({
        list: that.data.filterList
      })
      return;
    }
    if(that.data.curFilterSigId === ''){
      that.data.filterList.forEach(function (item, index) {
        if(item.topic.toLowerCase().includes(that.data.curKeyword.toLowerCase()) || item.group_name.toLowerCase().includes(that.data.curKeyword.toLowerCase())){
          listTemp.push(item);
        }
      })
      that.setData({
        list: listTemp
      })
      return;
    }
    if(that.data.curKeyword === ''){
      that.data.filterList.forEach(function (item, index) {
        if(item.group_name.includes(that.data.filterSigName)){
          listTemp.push(item);
        }
      })
      that.setData({
        list: listTemp
      })
      return;
    }
    that.data.filterList.forEach(function (item, index) {
      if(item.group_name.includes(that.data.filterSigName) && item.topic.toLowerCase().includes(that.data.curKeyword.toLowerCase())){
        listTemp.push(item);
      }
    })
    that.setData({
      list: listTemp
    })
  }
}
Page(mixin({

  /**
   * 页面的初始数据
   */
  data: {
    curFilterSigName: '全部SIG',
    curFilterSigId: '',
    curKeyword: '',
    filterSigId: '',
    filterSigName: '全部SIG',
    delId: '',
    curMid: '',
    curJoinUrl: '',
    cellInstance: null,
    popShow: false,
    userId: '',
    level: 0,
    iphoneX: false,
    list: [],
    filterList: [],
    columns: [],
    popShow: false,
    showDialog: false,
    showDialogDel: false
  },
  pickerChange: function (e) {
    this.setData({
      filterSigId: e.detail.value.id,
      filterSigName: e.detail.value.group_name
    })
  },
  search: function (e) {
    this.setData({
      curKeyword: e.detail.value
    })
    localMethod.filterData();
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      iphoneX: this.getTabBar().data.iPhoneX,
      userId: sessionUtil.getUserInfoByKey('userId')
    })
    let that = this;
    remoteMethods.getSigList(function (data) {
      if(data && data.length) {
        data.unshift({
          group_name: '全部SIG',
          id: ''
        })
        that.setData({
          columns: data
        })
      }
    })
    appUser.updateUserInfo(function () {
      that.setData({
        level: sessionUtil.getUserInfoByKey('level')
      })
      remoteMethods.getMettingWeekly(function (data) {
        that.setData({
          list: data,
          filterList: data
        })
        localMethod.filterData();
      })
    });
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    that = this;
    this.getTabBar().setData({
      _tabbat: 1
    })
  },
  onPullDownRefresh: function () {
    wx.stopPullDownRefresh();
    appUser.updateUserInfo(function () {
      that.setData({
        level: sessionUtil.getUserInfoByKey('level')
      })
      remoteMethods.getMettingWeekly(function (data) {
        that.setData({
          list: data,
          filterList: data
        })
        localMethod.filterData();
        
      })
    });
  },
  collect: function (e) {
    if(e.currentTarget.dataset.collect){
      remoteMethods.uncollect(e.currentTarget.dataset.collect, function (res) {
        remoteMethods.getMettingWeekly(function (data) {
          that.data.cellInstance.close();
          that.setData({
            list: data,
            filterList: data
          })
          localMethod.filterData();
        })
      })
    }else{
      remoteMethods.collect(e.currentTarget.dataset.id, function (res) {
        if(res.code == 201){
          remoteMethods.getMettingWeekly(function (data) {
            that.data.cellInstance.close();
            that.setData({
              list: data,
              filterList: data
            })
            localMethod.filterData();
          })
        }
      })
    }
  },
  filterSig: function () {
    this.setData({
      popShow: true
    })
    this.getTabBar().setData({
      show: false
    })
  },
  popCancel: function () {
    this.getTabBar().setData({
      show: true
    })
    this.setData({
      popShow: false
    })
    this.setData({
      filterSigId: this.data.curFilterSigId,
      filterSigName: this.data.curFilterSigName
    })
  },
  popConfirm: function () {
    this.getTabBar().setData({
      show: true
    })
    this.setData({
      popShow: false,
      curFilterSigId: this.data.filterSigId,
      curFilterSigName: this.data.filterSigName
    })
    localMethod.filterData();
  },
  onClose: function (e) {
    this.setData({
      cellInstance: e.detail.instance
    })
  },
  toDetail: function (e) {
    wx.navigateTo({
      url: '/pages/meeting/detail?id=' + e.currentTarget.dataset.id
    })
  },
  getAddr: function (e) {
    this.setData({
      showDialog: true,
      curMid: e.currentTarget.dataset.id,
      curJoinUrl: e.currentTarget.dataset.addr
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
  del: function () {
    remoteMethods.delMeeting(this.data.delId, function (data) {
      if(data.code == 204){
        that.setData({
          showDialogDel: false
        })
        remoteMethods.getMettingWeekly(function (data) {
          that.data.cellInstance.close();
          that.setData({
            list: data,
            filterList: data
          })
          localMethod.filterData();
        })
      }
    })
  },
  delCancel: function () {
    this.setData({
      showDialogDel: false
    })
  }
}))