// pages/nnews/nnews.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    coachList:[],
    id:'',
    flag:true
  },
  
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    wx.showLoading({
      title: '加载中...',
    })
    console.log(options)
    this.setData({
      id: options.id
    })
    this.getCoachList(options.id)
  },
  // 获取老师列表
  getCoachList(id) {
    wx.request({
      url: app.globalData.url + 'api/coach/list',
      data: {
        store_id: id,
        page: 1,
        pagesize: 10
      },
      method: 'post',
      success: res => {
        wx.hideLoading()
        console.log('获取教练团队接口返回', res)
        this.setData({
          coachList: res.data.data.data
        })
      }
    })
  },
  gostudent() {
    wx.redirectTo({
      url: '/pages/student/student?id='+this.data.id
    })
  },
  checkDetails(e) {
    if(this.data.flag){
      this.setData({
        flag:false
      })
    console.log(e)
    wx.navigateTo({
      url: '/pages/details/details?id=' + e.currentTarget.id
    })
    }else{
      setTimeout(item=>{
        this.setData({
          flag:true
        })
      },2000)
    }
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