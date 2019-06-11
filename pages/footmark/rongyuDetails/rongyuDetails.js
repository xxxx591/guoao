// pages/footmark/rongyuDetails/rongyuDetails.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    rongyuDetails:{}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options)
    this.getRongyuDetails(options.id, options.haiziId)
  },
  // 跳转到教练详情
  jiaolianDetails(e){
    wx.navigateTo({
      url: '/pages/details/details?id=' + e.currentTarget.id
    })
  },
  // 获取荣誉详情
  getRongyuDetails(id,haiziId){
    wx.request({
      url: app.globalData.url + 'api/footprint/homepage/honor',
      data: {
        token: app.globalData.token,
        team_library_id:parseInt(id),
        child_id:parseInt(haiziId)
      },
      method: 'post',
      success: res => {
        console.log('获取荣誉详情接口返回', res)
        this.setData({
          rongyuDetails: res.data.data,
        })
      }
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
  onShareAppMessage: function (e) {
    console.log(e)
  }
})