//app.js
var appSession = require("./utils/app-session.js");
App({
    onLaunch: function () {
        var self = this
        //判断微信版本是否 兼容小程序更新机制API的使用
        if (wx.canIUse('getUpdateManager')) {
            //创建 UpdateManager 实例
            const updateManager = wx.getUpdateManager();
            console.log('是否进入模拟更新');
            //检测版本更新
            updateManager.onCheckForUpdate(function (res) {
                console.log('是否获取版本');
                // 请求完新版本信息的回调
                if (res.hasUpdate) {
                    //监听小程序有版本更新事件
                    updateManager.onUpdateReady(function () {

                        updateManager.applyUpdate();
                    })
                    updateManager.onUpdateFailed(function () {
                        wx.showModal({
                            title: '已经有新版本喽~',
                            content: '请您删除当前小程序，到微信 “发现-小程序” 页，重新搜索打开哦~',
                        })
                    })
                }
            })
        } else {
            wx.showModal({
                title: '溫馨提示',
                content: '当前微信版本过低，无法使用该功能，请升级到最新微信版本后重试。'
            })
        }
        wx.getSystemInfo({
            success(res) {
                if (res.model.indexOf('iPhone X') >= 0) {
                    self.globalData.iPhoneX = true;
                }
            }
        })

    },

    onShow() {},
    loginCallback: null,
    globalData: {
        iphoneX: false
    }
})