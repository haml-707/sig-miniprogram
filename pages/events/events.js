// pages/events/events.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        iphoneX: false,
        chooseAddress: '',
        name: '',
        latitude: '',
        longitude: '',
        meetingConponent: null
    },
    actionStatus(e){
        if(e.detail === 1){
            this.getTabBar().setData({
                show: false
            })
        }else{
            this.getTabBar().setData({
                show: true
            })
        }
    },
    onChangeAddress: function () {
        var _page = this;
        wx.chooseLocation({
            success: function (res) {
                console.log(res);
                _page.setData({
                    chooseAddress: res.name,
                    name: res.address,
                    latitude: res.latitude,
                    longitude: res.longitude
                });
            },
            fail: function (err) {
                console.log(err)
            }
        });
    },

    openAddress: function () {
        var _page = this;
        console.log(_page.data.latitude);
        wx.openLocation({ //​使用微信内置地图查看位置。
            latitude: _page.data.latitude, //要去的纬度-地址
            longitude: _page.data.longitude, //要去的经度-地址
            name: _page.data.name,
            address: _page.data.chooseAddress
        })
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        
        this.setData({
            meetingConponent: this.selectComponent('#meeting'),
            iphoneX: this.getTabBar().data.iPhoneX
        })

    },

    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function () {

    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function () {
        this.getTabBar().setData({
            _tabbat: 2
        })
    },

    /**
     * 生命周期函数--监听页面隐藏
     */
    onHide: function () {

    },

    /**
     * 生命周期函数--监听页面卸载
     */
    onUnload: function () {

    },

    /**
     * 页面相关事件处理函数--监听用户下拉动作
     */
    onPullDownRefresh: function () {
        this.data.meetingConponent.initData();
    },

    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom: function () {

    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function () {

    }
})