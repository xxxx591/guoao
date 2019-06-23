// pages/init/init.js
const app = getApp()


Page({

  /**
   * 页面的初始数据
   */
  data: {
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    flag: true,
    accShow:false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function() {
    // 查看是否授权
    let _this = this
    wx.getSetting({
      success(res) {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称
          
        }else{
          _this.setData({
            accShow:true
          })
        }
      }
    })
  },
  bindGetUserInfo: function(e) {
    let that = this
    if (that.data.flag) {
      that.setData({
        flag: false
      })
      wx.login({
        success: res => {
          console.log(res.code);
          wx.getUserInfo({
            success: function(data) {

              console.log('点击登陆获取的数据', res)
              wx.request({
                url: app.globalData.url + 'api/wechat/miniLogin',
                header: {
                  "content-type": "application/x-www-form-urlencoded"
                }, // 设置请求的 header
                data: {
                  'encryptedData': data.encryptedData,
                  'iv': data.iv,
                  'code': res.code
                },
                method: 'post', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
                success: function(res) {
                  console.log('登陆的res', res)
                  app.globalData.token = res.data.data.token;
                  if (res.data.data.mobile == '') {
                    wx.navigateTo({
                      url: '/pages/login/login',
                    })

                  } else {
                    // 转存token
                    // app.globalData.token = '111';
                    wx.switchTab({
                      url: '/pages/index/index',
                    })

                  }
                },
                fail: function(err) {
                  console.log(err);
                }
              })
            }
          })
        }
      })
    } else {
      setTimeout(_ => {
        that.setData({
          flag: true
        })
      }, 1000)
    }

  },

  getuser() {
    wx.getSetting({
      success(res) {
        let lat = '';
        let lgt = '';
        console.log(res)
        if (res.authSetting["scope.userLocation"]) {
          wx.getLocation({
            type: 'wgs84',
            success(res) {
              console.log('地理位置', res)
              app.globalData.lat = res.latitude
              app.globalData.lnt = res.longitude
              lat = res.latitude
              lgt = res.longitude

            }
          })
        }
        if (res.authSetting["scope.userInfo"]) {
          wx.getUserInfo({
            success(res) {
              console.log('userinfo', res)
              // wx.request({
              //   url: app.globalData.url +'api/wechat/miniLogin',
              // })
            }
          })
        }
        if (res.authSetting["scope.userLocation"] && res.authSetting["scope.userInfo"]) {
          console.log('跳转！')
          wx.switchTab({
            url: '/pages/index/index'
          })
        }
      }
    })
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})