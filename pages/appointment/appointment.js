// pages/appointment/appointment.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    storeId: '',
    courseId:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  // 提交体验课
  formSubmit(e) {
    console.log(e)
    let params = {};
    params.store_id = this.data.storeId;
    params.name = e.detail.value.name;
    params.mobile = e.detail.value.mobile;
    params.age = e.detail.value.age;
    params.school = e.detail.value.school;
    if (this.data.courseId==null){
      console.log(this.data)
    }else{
      params.course_id = parseInt(this.data.courseId)
    }
    wx.request({
      url: app.globalData.url + 'api/course/signUp',
      data: params,
      method: 'post',
      success: res => {
        console.log('提交体验课接口返回', res)
        if (res.data.error_code == 0) {
          wx.showToast({
            title: '预定成功',
            icon: 'success',
            duration: 2000,
            success: function() {
              setTimeout(_=>{
              wx.navigateBack({
                delta: 2
              })
              },2000)

            }
          })
        }else{
          wx.showToast({
            title: res.data.error_msg,
            icon: 'none',
            duration: 2000, 
          })
        }
      }
    })
  },

  onLoad: function(options) {
    console.log(options)
    this.setData({
      courseId: options.courseId
    })
    wx.getStorage({
      key: 'storeId',
      success: res => {
        this.data.storeId = res.data
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