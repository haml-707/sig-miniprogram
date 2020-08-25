// pages/reserve/reserve.js
var appAjax = require('./../../utils/app-ajax');
var appSession = require("./../../utils/app-session.js");
var utils = require("./../../utils/utils.js");
utils.formateDate();
let remoteMethods = {
  getUserGroup: function (id,_callback) {
    appAjax.postJson({
      autoShowWait: true,
      type: 'GET',
			service: "GET_USER_GROUP",
			otherParams: {
				id : id
			},
			success: function(ret) {
				_callback && _callback(ret);
			}
		});
  },
  saveMeeting: function (postData,_callback) {
    appAjax.postJson({
      autoShowWait: true,
      type: 'POST',
			service: "SAVE_MEETING",
			data: postData,
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
    topic: '',
    sponsor: '',
    groupName: '',
    groupId: '',
    date: '',
    start: '',
    end: '',
    etherpad: '',
    agenda: '',
    emaillist: '',
    sigPopShow: false,
    sigResult: '',
    sigList: [],
    datePopShow: false,
    currentDate: new Date().getTime(),
    minDate: new Date().getTime(),
    timePopShow: false,
    currentTime: '08:00',
    minTime: 8,
    maxTime: 22,
    endTimePopShow: false,
    currentEndTime:'08:00',
    minEndTime: 8,
    maxEndTime: 22
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },
  meeting: function () {

    remoteMethods.saveMeeting({
      topic: this.data.topic,
      sponsor: this.data.sponsor,
      group_name: this.data.groupName,
      group_id: this.data.groupId,
      date: this.data.date,
      start: this.data.start,
      end: this.data.end,
      etherpad: this.data.etherpad,
      agenda: this.data.agenda,
      emaillist: this.data.emaillist
    }, function (data) {
      if(data.id){
          wx.redirectTo({
            url: '/pages/meeting/meeting-success?id=' + data.id,
          })
      }
    })
  },
  sigNameInput: function (e) {
    this.setData({
      topic: e.detail.value
    })
  },
  etherInput: function (e){
    this.setData({
      etherpad: e.detail.value
    })
  },
  agendaInput: function (e) {
    this.setData({
      agenda: e.detail.value
    })
  },
  emailInput: function (e) {
    this.setData({
      emaillist: e.detail.value
    })
  },
  sigConfirm: function () {
    let that = this;
    let sigObj = this.data.sigList.filter(function (item) {
      return item.group === that.data.sigResult;
    });
    sigObj = sigObj.length ? sigObj[0] : {}
    this.setData({
      groupName: sigObj.group_name || '',
      groupId: sigObj.group || '',
      etherpad: sigObj.etherpad || '',
      sigPopShow: false
    })
  },
  dateConfirm: function () {
    this.setData({
      date: (new Date(this.data.currentDate)).Format("yyyy-MM-dd"),
      datePopShow: false
    })
  },
  timeConfirm: function () {
    this.setData({
      start: this.data.currentTime,
      timePopShow: false
    })
  },
  endTimeConfirm: function () {
    this.setData({
      end: this.data.currentEndTime,
      endTimePopShow: false
    })
  },
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    this.setData({
      sponsor: appSession.getUserInfoByKey('gitee') || ''
    })
    let that = this;
    remoteMethods.getUserGroup(appSession.getUserInfoByKey('userId'), function (data) {
      if(data && data.length){
        that.setData({
          sigList: data
        })
      }
    })
  },
  sigRadioOnChange: function (e) {
    this.setData({
      sigResult: e.detail
    })
  },
  selSig: function () {
    this.setData({
      sigPopShow: true
    })
  },
  sigCancel: function () {
    this.setData({
      sigPopShow: false
    })
  },
  selDate: function () {
    this.setData({
      datePopShow: true
    })
  },
  selTime: function () {
    this.setData({
      timePopShow: true
    })
  },
  selEndTime: function () {
    this.setData({
      endTimePopShow: true
    })
  },
  dateCancel: function () {
    this.setData({
      datePopShow: false
    })
  },
  timeCancel: function () {
    this.setData({
      timePopShow: false
    })
  },
  endTimeCancel: function () {
    this.setData({
      endTimePopShow: false
    })
  },
  dateOnInput: function (e) {
    this.setData({
      currentDate: e.detail
    })
  },
  timeOnInput: function (e) {
    this.setData({
      currentTime: e.detail
    })
  },
  endTimeOnInput: function (e) {
    this.setData({
      currentEndTime: e.detail
    })
  },
})