// pages/contractDetail/contractDetail.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    dataList: '',
    contract_id: '',
    pic:0
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    this.setData({
      contract_id: options.status_id
    })
    console.log('3333', this.data.status)
    this.getDetails(this.data.contract_id)
  },
  // 打开文件
  openFile(){
    wx.downloadFile({
      // 示例 url，并非真实存在
      url: this.data.details.annex,
      success: function (res) {
        
        const filePath = res.tempFilePath
        wx.openDocument({
          filePath: filePath,
          success: function (res) {
            console.log('打开文档成功')
          }
        })
      },
      fail:function(res){
        console.log(res)
      }
    })
  },
  getDetails() {
    wx.request({
      url: app.globalData.url + 'api/contract/detail',
      data: {
        token: app.globalData.token,
        contract_id: this.data.contract_id,
      },
      method: 'post',
      success: res => {
        console.log('合同详情列表>>', res.data.data)
        let arrayList = res.data.data
<<<<<<< Updated upstream
        arrayList.map((item)=>{
          arrayList.started_at = arrayList.started_at.split(' ')[0]
          arrayList.ended_at = arrayList.ended_at.split(' ')[0]
        })
        if (res.error_code === 0){
=======
        let arr = res.data.data.get_contract_course
        let allpic = 0;
        arr.forEach(item => {
          allpic = allpic+ parseFloat(item.price) 
        })
        if (res.error_code !== 0) {
>>>>>>> Stashed changes
          this.setData({
            details: arrayList,
            dataList: arrayList.get_contract_course,
            pic: parseFloat(allpic).toFixed(2)
          })
<<<<<<< Updated upstream
        }else{
          wx.showToast({
            title: res.data.error_msg,
            icon: 'none',
            duration: 2000,
            success: function () {
            }
=======
        } else {
          this.setData({
            dataList: {}
>>>>>>> Stashed changes
          })
          setTimeout(()=>{
            wx.navigateBack({
              delta: 2
            })
          },1000)
        }
<<<<<<< Updated upstream
=======
        // arrayList.started_at = arrayList.started_at.split(' ')[0]
        // arrayList.ended_at = arrayList.ended_at.split(' ')[0]

>>>>>>> Stashed changes
      }
    })
  },
  // 支付
  handlePay(e) {
    // console.log('appid>>', app.globalData.appId)
    wx.request({
      url: app.globalData.url + 'api/pay/contract',
      data: {
        token: app.globalData.token,
        contract_id: this.data.contract_id
      },
      method: 'post',
      success: res => {
        console.log('支付返回参数', res)
        if (res.data.error_code != 0) {
          wx.showToast({
            title: res.data.error_msg,
            icon: 'none',
            duration: 2000,
            success: function () {

            }
          })
        } else {
          this.getOpenId(res.data.data)
        }
      }
    })

  },
  getOpenId: function (res) {
    wx.requestPayment({
      timeStamp: res.timestamp,
      nonceStr: res.nonceStr,
      package: res.package,
      signType: 'MD5',
      paySign: res.paySign,
      success(res) {
        console.log(res)
      },
      fail(res) { }
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