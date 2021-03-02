// pages/events/events.js
const sessionUtil = require("../../utils/app-session.js");
const appUser = require("../../utils/app-user.js");
let that = null;
Page({

    /**
     * 页面的初始数据
     */
    data: {
        iphoneX: false,
        eventLevel: 1,
        noAuthDialogShow: false
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        that = this;
        this.setData({
            iphoneX: this.getTabBar().data.iPhoneX
        })
        appUser.updateUserInfo(function () {
            that.setData({
                eventLevel: sessionUtil.getUserInfoByKey('eventLevel') || 1
            })
        });
    },
    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function () {
        this.getTabBar().setData({
            _tabbat: 2
        })
    },
    navigateTo(e) {
        const url = e.currentTarget.dataset.url;
        if ((this.data.eventLevel === 1) && url.includes('publish')) {
            this.setData({
                noAuthDialogShow: true
            })
            return;
        }
        wx.navigateTo({
            url
        })
    },
    /**
     * 页面相关事件处理函数--监听用户下拉动作
     */
    onPullDownRefresh: function () {
        wx.stopPullDownRefresh();
        appUser.updateUserInfo(function () {
            that.setData({
                eventLevel: sessionUtil.getUserInfoByKey('eventLevel') || 1
            })
        });
    },
    copyWechat() {
        wx.setClipboardData({
            data: 'openeuler123',
            success: () => {
                this.setData({
                    noAuthDialogShow: false
                })
            }
        })

    }
})