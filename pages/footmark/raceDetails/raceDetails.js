// pages/footmark/raceDetails/raceDetails.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    kDetails: {},
    score: 3, //评价分数
    score2: 3, //评价分数
    scoreArray: [1, 2, 3, 4, 5], //分为1-5个评分层次
    scoreArray2: [1, 2, 3, 4, 5], //分为1-5个评分层次
    scoreText: ['1星', '2星', '3星', '4星', '5星'], //评分列表
    scoreContent: '', //文字显示评分情况
    type:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    this.setData({
      type:options.type
    })
    this.getDetails(options.kid, options.cid)
  },
  jiaolianDetails(e) {
    console.log(e)
    wx.navigateTo({
      url: '/pages/details/details?id=' + e.currentTarget.id
    })
  },
  changeScore: function(e) {
    let that = this
    console.log(e) //控制台触摸事件信息
    // that.setData({
    //   score: e.currentTarget.id, 
    // })
  },
  changeScore2: function(e) {
    let that = this
    console.log(e) //控制台触摸事件信息
    // that.setData({
    //   score: e.currentTarget.id, 
    // })
  },
  // 获取课程详情
  getDetails(kid, cid) {
    wx.request({
      url: app.globalData.url + 'api/footprint/course/detail',
      data: {
        token: app.globalData.token,
        team_library_id: parseInt(kid),
        child_id: parseInt(cid)
      },
      method: 'post',
      success: res => {
        console.log('获取课程详情接口返回', res)
        let arrayList = res.data.data
        let item = res.data.data
        item.ended_at = (item.ended_at.split(' ')[1]).substring(0, 5)
        item.started_at = (item.started_at).substring(5, 16)
        this.setData({
          kDetails: res.data.data,
        })
        if (res.data.data.get_coach_assess[0].score) {
          this.setData({
            score: res.data.data.get_coach_assess[0].score,
          })

        }
        if (res.data.data.get_child_assess[0].score) {
          this.setData({
            score2: res.data.data.get_child_assess[0].score,
          })

        }
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