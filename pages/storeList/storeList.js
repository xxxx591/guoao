// pages/storeList/storeList.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    shopList: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    wx.showLoading({
      title: '加载中...',
    })
    this.getNearbyShop()
  },
  // 获取门店列表
  getNearbyShop() {
    wx.request({
      url: app.globalData.url + 'api/store/list',
      data: {
        token: app.globalData.token,
        page: 1,
        pagesize: 100
      },
      method: 'post',
      success: res => {
        wx.hideLoading()
        console.log('获取门店列表接口返回', res)
        this.setData({
          shopList: res.data.data.data,
        })

      }
    })
  },
  goStoreDetails(e) {
    console.log(e)
    wx.navigateTo({
      url: '/pages/store-details/storeDetails?id=' + e.currentTarget.dataset.id,
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