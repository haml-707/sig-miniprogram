// package-events/publish/publish.js
const appAjax = require('./../../utils/app-ajax');
const utils = require("./../../utils/utils.js");
utils.formateDate();
let that = null;
let remoteMethods = {
    addEvents: function (postData, _callback) {
        appAjax.postJson({
            autoShowWait: true,
            type: 'POST',
            service: "PUBLISH_EVENT",
            data: postData,
            success: function (ret) {
                _callback && _callback(ret);
            }
        });
    },
    saveMeeting: function (postData, _callback) {
        appAjax.postJson({
            autoShowWait: true,
            type: 'POST',
            service: "SAVE_MEETING",
            data: postData,
            success: function (ret) {
                _callback && _callback(ret);
            }
        });
    }
}
let localMethods = {
    validation: function (data) {
        if(data.activity_type === 1){
            if (!data.title) {
                this.toast('请输入活动标题');
                return;
            }
            if (!data.date) {
                this.toast('请选择活动日期');
                return;
            }
            if (!data.address) {
                this.toast('请输入活动城市');
                return;
            }
            if (!data.detail_address) {
                this.toast('请输入具体地址');
                return;
            }
            let flag = true;
            data.schedules.forEach(item => {
                if (!item.start) {
                    flag = false;
                }
                if (!item.end) {
                    flag = false;
                }
                if (!item.topic) {
                    flag = false;
                }
            });
            if (!flag) {
                this.toast('请补充日程必填信息');
                return;
            }    
        } else {
            if (!data.title) {
                this.toast('请输入活动标题');
                return;
            }
            if (!data.date) {
                this.toast('请选择活动日期');
                return;
            }
            if (!data.live_address) {
                this.toast('请输入直播地址');
                return;
            }
            let flag = true;
            data.schedules.forEach(item => {
                if (!item.start) {
                    flag = false;
                }
                if (!item.end) {
                    flag = false;
                }
                if (!item.topic) {
                    flag = false;
                }
            });
            if (!flag) {
                this.toast('请补充填写日程必填信息');
                return;
            }    
        }
        
        return true;
    },
    toast: function (msg) {
        wx.showToast({
            title: msg,
            icon: "none",
            duration: 2000
        });
    }
}
Page({

    /**
     * 页面的初始数据
     */
    data: {
        title: '',
        date: '',
        type: 1,
        address: '',
        addressName: '',
        desc: '',
        schedule: [{
            start: '',
            end: '',
            topic: '',
            speaker: ''
        }],
        datePopShow: false,
        timePopShow: false,
        curDate: new Date().getTime(),
        currentDate: new Date().getTime(),
        minDate: new Date().getTime(),
        startTimeIndex: 0,
        endTimeIndex: 0,
        start: '',
        end: '',
        currentTime: '08:00',
        minTime: 8,
        maxTime: 22,
        minEndTime: 8,
        maxEndTime: 22,
        filter(type, options) {
            if (type === 'minute') {
                return options.filter((option) => option % 15 === 0);
            }

            return options;
        },
        endTimePopShow: false,
        currentEndTime: '08:00',
        topicSelIndex: 1,
        longitude: '',
        latitude: '',
        liveAddress: ''
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        that = this;
    },
    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function () {

    },
    titleInput(e) {
        this.setData({
            title: e.detail.value
        })
    },
    selDate: function () {
        this.setData({
            datePopShow: true
        })
    },
    dateCancel: function () {
        this.setData({
            datePopShow: false
        })
    },
    dateOnInput: function (e) {
        this.setData({
            currentDate: e.detail
        })
    },
    dateConfirm: function () {
        this.setData({
            date: (new Date(this.data.currentDate)).Format("yyyy-MM-dd"),
            datePopShow: false
        })
    },
    radioOnChange(e) {
        this.setData({
            type: e.detail
        })
    },
    selAddress() {
        wx.chooseLocation({
            success: function (res) {
                that.setData({
                    address: res.address,
                    addressName: res.name,
                    longitude: res.longitude,
                    latitude: res.latitude
                })
            }
        })
    },
    addressNameInput(e) {
        this.setData({
            addressName: e.detail.value
        })
    },
    descInput(e) {
        this.setData({
            desc: e.detail.value
        })
    },
    scheduleTitleInput(e) {
        const key = `schedule[${e.currentTarget.dataset.index}].topic`;
        this.setData({
            [key]: e.detail.value
        })
    },
    speakerInput(e) {
        const key = `schedule[${e.currentTarget.dataset.index}].speaker`;
        this.setData({
            [key]: e.detail.value
        })
    },
    addSchedule() {
        let arrTemp = this.data.schedule;
        arrTemp.push({
            start: '',
            end: '',
            topic: '',
            speaker: ''
        })
        this.setData({
            schedule: arrTemp
        })
    },
    delSchedule(e) {
        let arrTemp = this.data.schedule;
        arrTemp.splice(e.currentTarget.dataset.index, 1);
        this.setData({
            schedule: arrTemp
        })
    },
    selTime: function (e) {
        this.setData({
            timePopShow: true,
            startTimeIndex: e.currentTarget.dataset.index
        })
    },
    timeCancel: function () {
        this.setData({
            timePopShow: false
        })
    },
    timeOnInput: function (e) {
        this.setData({
            currentTime: e.detail
        })
    },
    timeConfirm: function (e) {
        const key = `schedule[${this.data.startTimeIndex}].start`;
        this.setData({
            [key]: this.data.currentTime,
            timePopShow: false
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
    selEndTime: function (e) {
        this.setData({
            endTimePopShow: true,
            endTimeIndex: e.currentTarget.dataset.index
        })
    },
    endTimeOnInput: function (e) {
        this.setData({
            currentEndTime: e.detail
        })
    },
    endTimeConfirm: function () {
        const key = `schedule[${this.data.endTimeIndex}].end`;
        this.setData({
            [key]: this.data.currentEndTime,
            endTimePopShow: false
        })
    },
    endTimeCancel: function () {
        this.setData({
            endTimePopShow: false
        })
    },
    selTop(e) {
        this.setData({
            topicSelIndex: e.currentTarget.dataset.index
        })
    },
    liveAddressInput(e) {
        this.setData({
            liveAddress: e.detail.value
        })
    },
    publish() {
        let postData = null;
        if (this.data.type === 1) {
            postData = {
                "title": this.data.title,
                "date": this.data.date,
                "activity_type": 1,
                "synopsis": this.data.desc,
                "address": this.data.address,
                "detail_address": this.data.addressName,
                "longitude": this.data.longitude,
                "latitude": this.data.latitude,
                "poster": this.data.topicSelIndex,
                "schedules": this.data.schedule
            }
        } else {
            postData = {
                "title": this.data.title,
                "date": this.data.date,
                "activity_type": 2,
                "synopsis": this.data.desc,
                "live_address": this.data.liveAddress,
                "longitude": this.data.longitude,
                "latitude": this.data.latitude,
                "poster": this.data.topicSelIndex,
                "schedules": this.data.schedule
            }
        }
        if (!localMethods.validation(postData)) {
            return;
        }
        remoteMethods.addEvents(postData, (res) => {
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
    }
})