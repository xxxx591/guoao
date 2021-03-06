// pages/contractManager/contractManager.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    dataList:{}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.showLoading({
      
    })
    wx.request({
      url: app.globalData.url + 'api/contract/list',
      data: {
        token: app.globalData.token,
        page: "1",
        pagesize: "30"
      },
      method: 'post',
      success: res => {
        wx.hideLoading()
        console.log('合同列表', res)
        let arrayList = res.data.data.data
        this.setData({
          dataList: arrayList
        })
        console.log('>>>>>', this.data.dataList)
      }
    })
    
  },
  goConDetail(e) {
    wx.navigateTo({
      url: "/pages/contractDetail/contractDetail?status_id="+e.currentTarget.id
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