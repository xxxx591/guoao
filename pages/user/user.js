// pages/user/user.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo:''
  },
  /**
   * @desc:打电话
   * @author：llc
   */
  handleCall(){
    wx.makePhoneCall({
      phoneNumber: '01064941655',
    })
  },
  handleRegist(){
    wx.navigateTo({
      url: "/pages/gameList/gameList"
    })
  },
  handleOrder(){
    wx.navigateTo({
      url: "/pages/myOrder/myOrder"
    })
  },
  handleContract(){
    wx.navigateTo({
      url: "/pages/contractManager/contractManager"
    })
  },
 
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    
    wx.getUserInfo({
      success:(data) => {
        console.log('获取用户信息数据',data.code)
        this.setData({
          userInfo: JSON.parse(data.rawData)
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
  onShareAppMessage: function () {
    return{
      path: '/pages/appointment/appointment'
    }
  }
})