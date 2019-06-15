// pages/contractDetail/contractDetail.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    dataList:'',
    contract_id:''
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      contract_id: options.status_id
    })
    console.log('3333',this.data.status)
    this.getDetails()
  },
  getDetails(){
    wx.request({
      url: app.globalData.url + 'api/contract/detail',
      data: {
        token: app.globalData.token,
        contract_id: this.data.contract_id,
        pagesize: 50
      },
      method: 'post',
      success: res => {
        console.log('合同详情列表>>', res.data.data)
        let arrayList = res.data.data
        arrayList.map((item)=>{
          arrayList.started_at = arrayList.started_at.split(' ')[0]
          arrayList.ended_at = arrayList.ended_at.split(' ')[0]
        })
        if (res.error_code === 0){
          this.setData({
            dataList: arrayList
          })
        }else{
          wx.showToast({
            title: res.data.error_msg,
            icon: 'none',
            duration: 2000,
            success: function () {
            }
          })
          setTimeout(()=>{
            wx.navigateBack({
              delta: 2
            })
          },1000)
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