// pages/gameDetail/gameDetail.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    dataList:null,
    gameId:null,
    stuName:null,
    stuHeight:null,
    stuWeight:null
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      gameId:options.game_id
    })
    wx.request({
      url: app.globalData.url + 'api/game/detail',
      data: {
        token: app.globalData.token,
        game_id:this.data.gameId
      },
      method: 'post',
      success: res => {
        console.log('比赛详情列表>>', res.data.data)
        let arrayList = res.data.data
        arrayList.started_at = arrayList.started_at.split(' ')[0]
        arrayList.ended_at = arrayList.ended_at.split(' ')[0]
        this.setData({
          dataList: arrayList
        })
      }
    })
  },
  
  stuName(e){
    this.setData({
      stuName: e.detail.value
    })
  },
  stuHeight(e) {
    this.setData({
      stuHeight: e.detail.value
    })
  },
  stuWeight(e) {
    this.setData({
      stuWeight: e.detail.value
    })
  },
  /**
   * @desc:调教表单
   * @author:llc
   */
  handleSubmit(){
    const query = {
      token: app.globalData.token,
      game_id:this.data.gameId,
      game_element_id: this.data.dataList.get_game_element[0].game_id,
      content:'23333'
    }
    console.log(query)
    // wx.request({
    //   url: app.globalData.url + 'api/game/join/add',
    //   data: query,
    //   method: 'post',
    //   success: res => {
    //     console.log('提交表单返回>>', res.data.data)
    //   }
    // })

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