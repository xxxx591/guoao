// pages/details/details.js
const app = getApp()
var WxParse = require('../wxParse/wxParse.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    details: {},
    education: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    wx.showLoading({
      title: '加载中...',
    })
    console.log(options.id)

    this.getCoachList(options.id)
  },
  // 获取学生详情列表
  getCoachList(id) {
    wx.request({
      url: app.globalData.url + 'api/style/detail',
      data: {
        style_id: id,
      },
      method: 'post',
      success: res => {
        wx.hideLoading()
        console.log('获取学生详情列表接口返回', res)
        let article = res.data.data.honor
        WxParse.wxParse('article', 'html', article, this, 5);

        wx.setNavigationBarTitle({
          title: res.data.data.name,
        })

        this.setData({
          details: res.data.data,
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