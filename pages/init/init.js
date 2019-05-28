// pages/init/init.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {},
  getPhoneNumber: function(e) {
    console.log(e);

    wx.login({
      success: res => {
        console.log(res.code);
        wx.request({
          url: app.globalData.url + 'api/wechat/miniLogin',
          data: {
            'encryptedData': (e.detail.encryptedData),
            'iv': e.detail.iv,
            'code': res.code
          },
          method: 'post', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
          header: {
            "content-type": "application/x-www-form-urlencoded"
          }, // 设置请求的 header
          success: function(res) {
            console.log(res)

          },
          fail: function(err) {
            console.log(err);
          }
        })
      }
    })

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