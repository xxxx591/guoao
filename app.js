//app.js
App({
  onLaunch: function() {
    // 全局数据
    wx.getSystemInfo({
      success: (res) => {
        console.log(res)
        this.globalData.height = res.statusBarHeight
      }
    })
    // 展示本地存储能力
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)

    // 登录
    wx.login({
      success: res => {
        console.log('到后台换取 openId, sessionKey, unionId', res)
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
      }
    })
    // 获取用户信息
    wx.getSetting({
      success: res => {
        console.log('获取用户授权信息', res)
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              // 可以将 res 发送给后台解码出 unionId
              this.globalData.userInfo = res.userInfo

              // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
              // 所以此处加入 callback 以防止这种情况
              if (this.userInfoReadyCallback) {
                this.userInfoReadyCallback(res)
              }
            }
          })
        }
      }
    })

  },
  WxRequest(api, data, type) {
    wx.request({
      url: this.globalData.url + api,
      data: data,
      header: {},
      method: 'POST' || type,
      dataType: 'json',
      responseType: 'text',
      success: function(res) {
        return res
      },
      fail: function(res) {},
      complete: function(res) {},
    })
  },
  globalData: {
    token: '123',
    url: "https://api.yueyefc.com/",
    height: wx.getSystemInfoSync()['statusBarHeight'],
    lat: '',
    lnt: ''
  }
})