// pages/details/details.js
const app = getApp()
var WxParse = require('../wxParse/wxParse.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    courseDetails: {},
    storeId: '1',
    flag: true
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    wx.showLoading({
      title: '加载中...',
    })
    console.log(options.id)
    this.getDetails(options.id)
    wx.getStorage({
      key: 'storeId',
      success: res => {
        this.data.storeId = res.data
      }
    })
  },
  // 获取课程详情
  getDetails(id) {
    wx.request({
      url: app.globalData.url + 'api/course/detail',
      data: {
        course_id: id,
      },
      method: 'post',
      success: res => {
        wx.hideLoading()
        console.log('获取课程详情接口返回', res)
        let article = res.data.data.content
        WxParse.wxParse('article', 'html', article, this, 5);
        this.setData({
          courseDetails: res.data.data
        })
      }
    })
  },
  goBuy(e) {
    if (this.data.flag) {
      this.setData({
        flag: false
      })
      wx.navigateTo({
        url: '/pages/appointment/appointment?courseId=' + e.currentTarget.id + "&name=" + this.data.courseDetails.name,
      })
    } else {
      setTimeout(item => {
        this.setData({
          flag: true
        })
      }, 1000)
    }
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