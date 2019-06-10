// pages/gameList/gameList.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    dataList: {
      startTime: '',
      endTime: ''
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.request({
      url: app.globalData.url + 'api/game/list',
      data: {
        token: app.globalData.token,
        page: "1",
        pagesize: "30"
      },
      method: 'post',
      success: res => {
        console.log('比赛名称列表', res)
        let arrayList = res.data.data.data
        arrayList.map((item) => {
          item.started_at = item.started_at.split(' ')[0]
          item.ended_at = item.ended_at.split(' ')[0]
        })
        this.setData({
          dataList: arrayList
        })
      }
    })
  },
  handleGoOrder(e){
    wx.navigateTo({
      url: '/pages/orderList/orderList?courseId=' + e.currentTarget.id
    })
  },
  handlePay(){
    console.log("data")
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