// pages/details-news/details-news.js
const app = getApp()
var WxParse = require('../wxParse/wxParse.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    details:{},
    pic:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    console.log(options)
    this.getNewsDetails(options.id)
  },
  // 获取新闻详情
  getNewsDetails(id) {
    wx.request({
      url: app.globalData.url + 'api/info/detail',
      data: {
        info_id: id,
      },
      method: 'post',
      success: res => {
        console.log('获取新闻详情接口返回', res)
        let article = res.data.data.content
        WxParse.wxParse('article', 'html', article, this, 5);


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