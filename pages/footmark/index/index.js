// pages/details/details.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    haiziDetails: {},
    accShow: false,
    honor: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    wx.showLoading({

    })

  },
  // 跳转至echarts
  reportDetails(e) {
    wx.navigateTo({
      url: '/pages/footmark/echarts/echarts?cid=' + this.data.haiziDetails.id
    })
  },
  // 跳转到比赛列表
  raceMore(e) {
    wx.navigateTo({
      url: '/pages/footmark/raceList/racelist?id=' + e.currentTarget.id
    })
  },
  // 跳转到比赛详情
  bisaiDetails(e) {
    wx.navigateTo({
      url: '/pages/footmark/raceDetails/raceDetails?kid=' + e.currentTarget.id + '&cid=' + this.data.haiziDetails.id + '&type=2'
    })
  },
  // 跳转到荣誉详情
  rongyuDetails(e) {
    wx.navigateTo({
      url: '/pages/footmark/rongyuDetails/rongyuDetails?id=' + e.currentTarget.id + '&haiziId=' + this.data.haiziDetails.id
    })
  },
  // 跳转到孩子详情
  haiziDetails(e) {
    wx.navigateTo({
      url: '/pages/footmark/childList/childList?id=' + e.currentTarget.id
    })
  },
  // 获取足迹孩子详情
  getHaiziDetails() {
    console.log(app.globalData.token)
    wx.request({
      url: app.globalData.url + 'api/footprint/homepage/child',
      data: {
        token: app.globalData.token,
      },
      method: 'post',
      success: res => {
        wx.hideLoading()
        console.log('获取足迹孩子详情接口返回', res)
        if (res.data.data.course.length > 0) {
          res.data.data.course.map(item => {
            item.started_at = item.started_at.slice(5, 16)
            item.ended_at = item.ended_at.slice(10, 16)
          })

        }
        if (res.data.data.honor.length > 0) {
          res.data.data.honor.map(item => {
            item.created_at = item.created_at.slice(5, 11) + '获得'
          })
        }

        this.setData({
          accShow: true,
          haiziDetails: res.data.data,
        })
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
    this.getHaiziDetails()
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
  onShareAppMessage: function(e) {
    console.log(e)
  }
})