// package-events/publish/publish.js

const utils = require("./../../utils/utils.js");
utils.formateDate();
let that = null;
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
            startTime: '',
            endTime: '',
            scheduleTitle: '',
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
        topicSelIndex: 1
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
                    addressName: res.name
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
        const key = `schedule[${e.currentTarget.dataset.index}].scheduleTitle`;
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
            startTime: '',
            endTime: '',
            scheduleTitle: '',
            speaker: ''
        })
        this.setData({
            schedule: arrTemp
        })
    },
    delSchedule (e){
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
        const key = `schedule[${this.data.startTimeIndex}].startTime`;
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
        const key = `schedule[${this.data.endTimeIndex}].endTime`;
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
    }
})