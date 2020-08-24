// pages/sig/add-sig-member.js
var appAjax = require('./../../utils/app-ajax');
let remoteMethods = {
  getSigMemberList: function (id,_callback) {
    appAjax.postJson({
      autoShowWait: true,
      type: 'GET',
			service: "SIG_MEMBER_LIST",
			otherParams: {
				id : id
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
    memberList: [],
    id:""
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(777)
    this.setData({
      id: options.id
    })
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    let that = this;
    remoteMethods.getSigMemberList(this.data.id, function (list) {
      that.setData({
        memberList: list
      })
    });
  },
  toDetail: function (e) {
    wx.navigateTo({
      url: '/pages/sig/member-detail?id=' + e.currentTarget.dataset.id + '&avatar=' + e.currentTarget.dataset.avatar + '&name=' + e.currentTarget.dataset.name + '&nickname=' + e.currentTarget.dataset.nickname
    })
  },
  addMember: function (){
    wx.navigateTo({
      url: '/pages/sig/add-member?sigId='  + this.data.id
    })
  },
  delMember: function (){
    wx.navigateTo({
      url: '/pages/sig/del-member?sigId='  + this.data.id
    })
  }
})