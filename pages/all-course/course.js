// pages/storeList/storeList.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    courseList: [],
    storeId:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    console.log(options.id)
    this.data.storeId = options.id 
    this.getCourseList(options.id)
  },
  // 获取课程列表
  getCourseList(id) {
    wx.request({
      url: app.globalData.url + 'api/course/list',
      data: {
        store_id: id,
        page: 1,
        pagesize: 30
      },
      method: 'post',
      success: res => {
        console.log('获取课程列表接口返回', res)

        this.setData({
          courseList: res.data.data.data
        })
      }
    })
  },
  goCourseDetails(e) {
    console.log(e)
    wx.navigateTo({
      url: '/pages/course-details/courseDetails?id=' + e.currentTarget.id,
    })
  },
  buy(e) {
    wx.navigateTo({
      url: '/pages/appointment/appointment?courseId=' + e.currentTarget.id,
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