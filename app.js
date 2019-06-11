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
        this.globalData.code = res.code
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
            success: data => {
              console.log(data)
              // 可以将 res 发送给后台解码出 unionId
              this.globalData.encryptedData = data.encryptedData
              this.globalData.iv = data.iv
              wx.request({
                url: this.globalData.url + 'api/wechat/miniLogin',
                header: {
                  "content-type": "application/x-www-form-urlencoded"
                }, // 设置请求的 header
                data: {
                  'encryptedData': data.encryptedData,
                  'iv': data.iv,
                  'code': this.globalData.code
                },
                method: 'post', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
                success: (res)=> {
                  console.log('转存token',res)
                  // 转存token
                  // this.globalData.token = res.data.data.token;
                  this.globalData.token = '111';
                  // 打开校验
                  wx.switchTab({
                    url: '/pages/index/index',
                    // url: '/pages/user/user',
                  })
                },
                fail: function(err) {
                  console.log(err);
                }
              })
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
    token: '111',
    url: "https://api.yueyefc.com/",
    height: wx.getSystemInfoSync()['statusBarHeight'],
    lat: '',
    lnt: ''
  }
})