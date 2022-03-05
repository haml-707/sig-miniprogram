//index.js
const mixin = require("../../utils/page-mixin.js").$pageMixin;
const sessionUtil = require("../../utils/app-session.js");
const appUser = require("../../utils/app-user.js");
let that = null;
Page(mixin({
    data: {
        imgUrls: [
            {
                type: 1,
                url: 'https://openeuler-website-beijing.obs.cn-north-4.myhuaweicloud.com/%E6%AC%A7%E6%8B%89%E6%96%B0%E5%B9%B4%E8%A7%86%E9%A2%910.3.mp4',
                poster: 'https://openeuler-website-beijing.obs.cn-north-4.myhuaweicloud.com/detail-banner/video-poster.png'
            },
            {
                type: 2,
                url: 'https://openeuler-website-beijing.obs.cn-north-4.myhuaweicloud.com/detail-banner/mini-banner.png',
                src:'../newyear/newyear'
            },
            {
                type: 3,
                url: 'https://openeuler-website-beijing.obs.cn-north-4.myhuaweicloud.com/detail-banner/%E5%B0%8F%E7%A8%8B%E5%BA%8F%E5%B7%A5%E5%8D%A1%E5%A5%97banner.png',
                src:'../card/card'
            },
        ],
        iphoneX: false,
        meetingConponent: null,
        autoplay: true
    },
    handleContact (e) {
        if (!sessionUtil.getUserInfoByKey('access')) {
            wx.navigateTo({
                url: '/pages/auth/auth'
            })
            return;
        }
        wx.navigateTo({
            url: e.currentTarget.dataset.src
        })
    },
    swithTab(e) {
        if (!sessionUtil.getUserInfoByKey('access')) {
            wx.navigateTo({
                url: '/pages/auth/auth'
            })
            return;
        }
        wx.switchTab({
            url: e.currentTarget.dataset.url
        })
    },
    previewImage(e) {
        
        const current = e.target.dataset.src //获取当前点击的 图片 url
        wx.previewImage({
            current,
            urls: [current]
        })
    },
    onLoad: function () {
        wx.showShareMenu({
            withShareTicket: true,
            menus: ['shareAppMessage', 'shareTimeline']
          })
        that = this;
        appUser.updateUserInfo(function () {
            that.setData({
                meetingConponent: that.selectComponent('#meeting'),
                iphoneX: that.getTabBar().data.iPhoneX,
            })
        });
    },
    onShow: function () {
        this.getTabBar().setData({
            _tabbat: 0
        })
    },
    onPullDownRefresh: function () {
        wx.stopPullDownRefresh();
        appUser.updateUserInfo(function () {
            that.data.meetingConponent.initData();
        });
    },
    actionStatus(e) {
        if (e.detail === 1) {
            this.getTabBar().setData({
                show: false
            })
        } else {
            this.getTabBar().setData({
                show: true
            })
        }
    },
    checkLogin() {
        if (!sessionUtil.getUserInfoByKey('access')) {
            wx.navigateTo({
                url: '/pages/auth/auth'
            })
            return;
        }
    },
    play() {
        this.setData({
            autoplay: false
        })
    },
    pause() {
        this.setData({
            autoplay: true
        })
    },
    ended() {
        this.setData({
            autoplay: true
        })
    }
}))