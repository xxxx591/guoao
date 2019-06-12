// pages/appointment/appointment.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    storeId: '',
    courseId: '',
    haiziDetails: {},
    region1: '',
    region2: '',
    customItem: '全部',
    childId:'',
    params: {
      childImg: '',
      sex: ''
    },
  },

  /**
   * 生命周期函数--监听页面加载
   */

  onLoad: function (options) {
    console.log(options)
    this.setData({
      childId:options.id
    })
    this.getChildDetails()

  },
  
  // 获取孩子列表信息
  getChildDetails(id) {
    wx.request({
      url: app.globalData.url + 'api/user/child/list',
      data: {
        token: app.globalData.token,
        page:1,
        pagesize:30
      },
      method: 'post',
      success: res => {
        console.log('获取孩子列表信息接口返回', res)
        this.setData({
          childList: res.data.data.data, 
        })
      }
    })
  },
   
  xiugai(e){
    wx.navigateTo({
      url: '/pages/footmark/childInfo/childInfo?id=' + e.currentTarget.id
    })
  },
   
  // 修改孩子信息
  formSubmit(e) {
    wx.navigateTo({
      url: '/pages/footmark/childInfo/childInfo?id=null' 
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})