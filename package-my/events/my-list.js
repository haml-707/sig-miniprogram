// package-my/events/under-release.js
Page({

    /**
     * 页面的初始数据
     */
    data: {

    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        console.log(options.type == 1);
        let title = '';
        if (options.type == 1) {
            title = '待发布';
        } else if (options.type == 2) {
            title = '已发布';
        } else if (options.type == 3) {
            title = '报名表单';
        } else if (options.type == 4) {
            title = '草稿箱';
        } else if (options.type == 5) {
            title = '发布中';
        } else if (options.type == 6) {
            title = '我收藏的活动';
        } else if (options.type == 7) {
            title = '我报名的活动';
        }
        wx.setNavigationBarTitle({
            title
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