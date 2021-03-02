// pages/my/my.js
const sessionUtil = require("../../utils/app-session.js");
Page({

    /**
     * 页面的初始数据
     */
    data: {
        iphoneX: false,
        avatarUrl: '',
        nickName: '',
        level: 1
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
        this.getTabBar().setData({
            _tabbat: 3
        })
    },
    go(e) {
        wx.navigateTo({
            url: e.currentTarget.dataset.url
        })
    }
})