// pages/details/details.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    haiziDetails: {}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    this.getHaiziDetails()
  },
  // 跳转到比赛列表
  raceMore(e){
    wx.navigateTo({
      url: '/pages/footmark/raceList/racelist?id=' + e.currentTarget.id 
    })
  },
  // 跳转到比赛详情
  bisaiDetails(e){
    wx.navigateTo({
      url: '/pages/footmark/raceDetails/raceDetails?kid=' + e.currentTarget.id +'&cid='+this.data.haiziDetails.id
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
      url: '/pages/footmark/childInfo/childInfo?id=' + e.currentTarget.id
    })
  },
  // 获取足迹孩子详情
  getHaiziDetails() {
    wx.request({
      url: app.globalData.url + 'api/footprint/homepage/child',
      data: {
        token: app.globalData.token,
      },
      method: 'post',
      success: res => {
        console.log('获取足迹孩子详情接口返回', res)
        this.setData({

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