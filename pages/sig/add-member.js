// pages/sig/add-member.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    list: [
      {
        name: '1'
      },
      {
        name: '2'
      },
      {
        name: '3'
      },
      {
        name: '4'
      },
      {
        name: '1'
      },
      {
        name: '2'
      },
      {
        name: '3'
      },
      {
        name: '4'
      },
      {
        name: '1'
      },
      {
        name: '2'
      },
      {
        name: '3'
      },
      {
        name: '4'
      },
      {
        name: '1'
      },
      {
        name: '2'
      },
      {
        name: '3'
      },
      {
        name: '4'
      },
      {
        name: '1'
      },
      {
        name: '2'
      },
      {
        name: '3'
      },
      {
        name: '4'
      }
    ],
    result: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },
  onChange: function (e) {
      this.setData({
        result: e.detail
      })
  }
})