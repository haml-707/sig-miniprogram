// package-events/events/event-detail.js
const appAjax = require('./../../utils/app-ajax');
const sessionUtil = require("../../utils/app-session.js");

let that = null;
let remoteMethods = {
    getDraftDetail: function (_callback) {
        let service = 'DRAFT_DETAIL';
        if (that.data.type == 5) {
            service = 'EVENT_DETAIL'
        } else if (that.data.type == 1) {
            service = 'EXAMINE_DETAIL'
        }
        appAjax.postJson({
            autoShowWait: true,
            type: 'GET',
            service,
            otherParams: {
                id: that.data.id
            },
            success: function (ret) {
                _callback && _callback(ret);
            }
        });
    },
    reject: function (_callback) {

        appAjax.postJson({
            autoShowWait: true,
            type: 'PUT',
            service: 'REJECT_PUBLISH',
            otherParams: {
                id: that.data.id || ''
            },
            success: function (ret) {
                _callback && _callback(ret);
            }
        });
    },
    resolve: function (_callback) {

        appAjax.postJson({
            autoShowWait: true,
            type: 'PUT',
            service: 'RESOLVE_PUBLISH',
            otherParams: {
                id: that.data.id || ''
            },
            success: function (ret) {
                _callback && _callback(ret);
            }
        });
    },
    draftPublish: function (postData, _callback) {

        appAjax.postJson({
            autoShowWait: true,
            type: 'PUT',
            service: 'EDIT_DETAIL_PUBLISH',
            data: postData,
            otherParams: {
                id: that.data.id || ''
            },
            success: function (ret) {
                _callback && _callback(ret);
            }
        });
    },
}
Page({

    /**
     * 页面的初始数据
     */
    data: {
        info: {},
        id: '',
        steps: [],
        tabIndex: 0,
        type: 1,
        level: 1,
        user: ''
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        that = this;
        this.setData({
            id: options.id,
            type: options.type,
            level: sessionUtil.getUserInfoByKey('eventLevel') || 1,
            user: sessionUtil.getUserInfoByKey('userId')
        })
    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function () {
        remoteMethods.getDraftDetail((res) => {
            this.setData({
                info: res
            })
            let arr = [];
            JSON.parse(res.schedules).forEach(item => {
                arr.push({
                    duration: item.start + '-' + item.end,
                    title: item.topic,
                    speaker: item.speaker ? (item.speaker + '-' + item.desc) : ''
                })
            });
            this.setData({
                steps: arr
            })
        });
    },
    switchTab(e) {
        this.setData({
            tabIndex: e.currentTarget.dataset.index
        })
    },
    openLocation(e) {
        if (e.currentTarget.dataset.item.activity_type == 2) {
            return;
        }
        wx.openLocation({
            latitude: Number(e.currentTarget.dataset.item.latitude),
            longitude: Number(e.currentTarget.dataset.item.longitude),
            name: e.currentTarget.dataset.item.detail_address, // 名称
            address: e.currentTarget.dataset.item.address // 地址
        });
    },
    toEditDraft() {
        wx.redirectTo({
            url: `/package-events/publish/publish?id=${this.data.id}&type=${this.data.type}`
        })
    },
    draftPublish() {
        let postData = this.data.info;
        postData.schedules = JSON.parse(postData.schedules);
        remoteMethods.draftPublish(postData, (res) => {
            if (res.code === 201) {
                wx.redirectTo({
                    url: '/package-events/publish/success?type=2'
                })
            } else {
                setTimeout(function () {
                    wx.showToast({
                        title: res.message,
                        icon: "none",
                        duration: 2000
                    }, 100);
                })
            }
        })
    },
    reject() {
        remoteMethods.reject(() => {
            wx.navigateBack();
        })
    },
    resolve() {
        remoteMethods.resolve(() => {
            wx.navigateBack();
        })
    },
    editSchedule() {
        wx.redirectTo({
            url: `/package-events/publish/publish?id=${this.data.id}&type=${this.data.type}`
        })
    },
    switchTab2() {
        this.setData({
            tabIndex: 1
        })
    },
    toSignUp() {
        wx.navigateTo({
            url: `/package-events/sign-up/sign-up?id=${this.data.info.id}&title=${this.data.info.title}&poster=${this.data.info.poster}`
        })
    },
    onShareAppMessage() {
        return {
            title: '活动详情',
            path: `/package-events/events/event-detail?id=${that.data.id}&type=5`
        }
    }
})