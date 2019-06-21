// pages/introduction/introduction.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    type: 1,
    newsList:[],
    sid:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    wx.showLoading({
      title: '加载中...',
    })
    this.getNewsList(options.id)
    this.setData({
      sid:options.id
    })
  },
  // 获取新闻列表
  getNewsList(id){
    wx.request({
      url: app.globalData.url + 'api/info/list',
      data: {
        store_id: parseInt(id),
        page:1,
        pagesize:30
      },
      method: 'post',
      success: res => {
        wx.hideLoading()
        console.log('获取新闻列表接口返回', res)
        let list = res.data.data.data
        let reg = /<\/?.+?\/?>/g; 
        list.forEach(item=>{
          item.content = (item.content).replace(reg,'')
        })
         this.setData({
           newsList: list
         })
      }
    })
  },
  // 跳转至详情
  newsDetails(e){
    wx.navigateTo({
      url: '/pages/detailsNews/detailsNews?id=' + e.currentTarget.id,
    })
  },
  // 切换至学生列表
  gostudent(e) {
    console.log(e)
    if (e.currentTarget.dataset.num  == 1) {
      console.log(123)
      this.getNewsList(this.data.sid)
      this.setData({
        type: e.currentTarget.dataset.num 
      })
    } else {
      this.getNewsList(this.data.sid)
      this.setData({
        type: e.currentTarget.dataset.num 
      })

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