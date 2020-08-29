// custom-tab-bar/index.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {

  },

  /**
   * 组件的初始数据
   */
  data: {
    show: true,
    _tabbat: 0,
    iPhoneX: null,
    urls: [
      '/pages/index/index',
      '/pages/meeting/meeting',
      '/pages/my/my'
    ]
  },
  attached() {
    var self = this
    wx.getSystemInfo({
      success(res) {
        if (res.model.indexOf('iPhone X') >= 0) {
          self.setData({
            iPhoneX: true
          });
        }
      }
    })
  },
  /**
   * 组件的方法列表
   */
  methods: {
    switchTap: function (e) {
      var self = this
      var index = e.currentTarget.dataset.index;
      var urls = self.data.urls
      wx.switchTab({
        url: urls[index],
      })

    }
  }
})