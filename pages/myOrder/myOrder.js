const app = getApp()
// const appId = app.globalData.appId
// const key = app.globalData.key
// const code = app.globalData.code

Page({

  /**
   * 页面的初始数据
   */
  data: {
    dataList: {},
    flag: true
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    wx.showLoading({
      title: '加载中...',
    })
    wx.request({
      url: app.globalData.url + 'api/game/join/list',
      data: {
        token: app.globalData.token,
        page: "1",
        pagesize: "30"
      },
      method: 'post',
      success: res => {
        wx.hideLoading()
        console.log('比赛名称列表', res)
        let arrayList = res.data.data.data
        arrayList.map((item) => {
          item.started_at = item.started_at.split(' ')[0]
          item.ended_at = item.ended_at.split(' ')[0]
        })
        this.setData({
          dataList: arrayList
        })
      }
    })
  },
  handleGoOrder(e) {
    wx.navigateTo({
      url: '/pages/orderList/orderList?courseId=' + e.currentTarget.id
    })
  },
  handlePay(e) {
    let that = this;
    if (that.data.flag) {
      that.setData({
        flag: false
      })
      // console.log('appid>>', app.globalData.appId)
      wx.request({
        url: app.globalData.url + 'api/pay/game',
        data: {
          token: app.globalData.token,
          game_join_id: e.currentTarget.id
        },
        method: 'post',
        success: res => {
          console.log('支付返回参数', res)
          if (res.data.error_code != 0) {
            wx.showToast({
              title: res.data.error_msg,
              icon: 'none',
              duration: 2000,
              success: function() {

              }
            })
          } else {
            this.getOpenId(res.data.data)
          }
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
  getOpenId: function(res) {
    wx.requestPayment({
      timeStamp: res.timestamp,
      nonceStr: res.nonceStr,
      package: res.package,
      signType: 'MD5',
      paySign: res.paySign,
      success(res) {
        console.log(res)
      },
      fail(res) {}
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