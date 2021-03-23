//index.js
const mixin = require("../../utils/page-mixin.js").$pageMixin;
const sessionUtil = require("../../utils/app-session.js");
const appUser = require("../../utils/app-user.js");
let that = null;
Page(mixin({
    data: {
        imgUrls: [{
                type: 1,
                url: 'https://openeuler-website.obs.ap-southeast-1.myhuaweicloud.com/%E5%B0%8F%E7%A8%8B%E5%BA%8F%E9%A6%96%E9%A1%B5%E6%96%B0banner.png'
            },
            {
                type: 2,
                url: 'https://openeuler-website.obs.ap-southeast-1.myhuaweicloud.com/openEuler%E8%B4%A1%E7%8C%AE%E8%80%85%E6%96%B0%E6%98%A5%E7%A4%BC%E7%89%A90204b.mp4',
                poster: 'https://openeuler-website.obs.ap-southeast-1.myhuaweicloud.com/video-poster/2.png'
            },
            {
                type: 2,
                url: 'https://openeuler-website.obs.ap-southeast-1.myhuaweicloud.com/IMG_7242.MP4',
                poster: 'https://openeuler-website.obs.ap-southeast-1.myhuaweicloud.com/video-poster/1.png'
            }
        ],
        iphoneX: false,
        meetingConponent: null
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
    }
}))