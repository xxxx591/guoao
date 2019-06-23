// pages/myOrder/myOrder.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    details:{},
    endTime:'',
    startTime:'',
    accShow:false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.showLoading({
      
    })
    wx.request({
      url: app.globalData.url + 'api/game/join/detail',
      data: {
        token: app.globalData.token,
        game_join_id: options.courseId,
        
      },
      method: 'post',
      success: res => {
        wx.hideLoading()
        if(JSON.stringify(res.data.data)=="{}"){
          wx.showToast({
            title: res.data.error_msg,
            icon:'none',
            duration:1000,
            success: function () {
              setTimeout(_ => {
                wx.navigateBack({
                  delta: 1
                })
              }, 1000)

            }
          })
        }else{
          wx.hideLoading()
        console.log('比赛名称列表', res)
        let arrayList = res.data.data
        let arr = res.data.data.get_game_and_store[0]
        let start = arr.started_at.slice(5, 16)
        let end = arr.ended_at.slice(5, 16)
        this.setData({
          details: arrayList,
          endTime: end,
          startTime: start,
          accShow:true
        })
        console.log(this.data.dataList)
        }
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

  }
})