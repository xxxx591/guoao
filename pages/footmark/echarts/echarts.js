// pages/footmark/echarts/echarts.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    time: '',
    echarts:{}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    this.setData({
      time: this.getNowFormatDate()
    })
    this.getDetails(options.cid)
  },
  // 获取echarts数据
  getDetails(cid) {
    wx.request({
      url: app.globalData.url + 'api/user/child/report/detail',
      data: {
        token: app.globalData.token,
        child_id: parseInt(cid),
        created_at: this.data.time
      },
      method: 'post',
      success: res => {
        console.log('获取echarts数据接口返回', res)
        this.setData({
          echarts:res.data.data
        })
      }
    })
  },
  // 获取当前时间
  getNowFormatDate() {
    var date = new Date();
    var seperator1 = "-";
    var year = date.getFullYear();
    var month = date.getMonth() + 1;
    if (month >= 1 && month <= 9) {
      month = "0" + month;
    }
    var currentdate = year + seperator1 + month;
    return currentdate;
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