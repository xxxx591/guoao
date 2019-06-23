// pages/appointment/appointment.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    storeId: '',
    courseId: '',
    haiziDetails: {},
    region1: '',
    region2: '',
    customItem: '全部',
    childId:'',
    params: {
      childImg: '',
      sex: ''
    },
  },

  /**
   * 生命周期函数--监听页面加载
   */

  onLoad: function (options) {
    wx.showLoading({
      
    })
    console.log(options)
    this.setData({
      childId:options.id
    })
    

  },
  
  // 获取孩子列表信息
  getChildDetails(id) {
    wx.request({
      url: app.globalData.url + 'api/user/child/list',
      data: {
        token: app.globalData.token,
        page:1,
        pagesize:30
      },
      method: 'post',
      success: res => {
        wx.hideLoading()
        console.log('获取孩子列表信息接口返回', res)
        this.setData({
          childList: res.data.data.data, 
        })
      }
    })
  },
  //  展示足迹
  goback(e){
    wx.request({
      url: app.globalData.url + 'api/footprint/homepage/child',
      data: {
        token: app.globalData.token,
        child_id:e.currentTarget.id
      },
      method: 'post',
      success: res => {
        console.log('展示足迹接口', res.data)
        if(res.data.error_code==0){
          wx.showToast({
            title: '修改成功',
            icon: 'success',
            duration: 1000,
            success: function () {
              setTimeout(_ => {
                wx.navigateBack({
                  delta: 2
                })
              }, 1000)

            }
          })
        }
      }
    })
  },
  // 修改孩子资料
  xiugai(e){
    wx.navigateTo({
      url: '/pages/footmark/childInfo/childInfo?id=' + e.currentTarget.id
    })
  },
   
  // 修改孩子信息
  formSubmit(e) {
    wx.navigateTo({
      url: '/pages/footmark/childInfo/childInfo?id=null' 
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
    this.getChildDetails()
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