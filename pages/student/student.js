// pages/student/student.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    coachList: [],
    storeId: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    console.log(options.id)
    this.getCoachList(options.id)
    wx.getStorage({
      key: 'storeId',
      success: res => {
        this.data.storeId = res.data
      }
    })
  },
  // 获取学生列表
  getCoachList(id) {
    wx.request({
      url: app.globalData.url + 'api/style/list',
      data: {
        store_id: id,
        page: 1,
        pagesize: 10
      },
      method: 'post',
      success: res => {
        console.log('获取学生列表接口返回', res)
        this.setData({
          coachList: res.data.data.data
        })
      }
    })
  },
  // 跳转至学生详情
  goStudentDetails(e) {
    wx.navigateTo({
      url: '/pages/studentDetails/details?id=' + e.currentTarget.id,
    })
  },
  goTeach() {
    wx.redirectTo({
      url: '/pages/nnews/nnews?id=' + this.data.storeId
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