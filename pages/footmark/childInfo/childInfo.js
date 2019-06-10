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
    sexItems: [{
        sex: 1,
        value: '男'
      },
      {
        sex: 2,
        value: '女'
      },
    ],
    params:{}, 
  },

  /**
   * 生命周期函数--监听页面加载
   */

  onLoad: function(options) {
    console.log(options)
    this.getChildDetails(options.id)

  },
  // 修改图片
  changerPhoto() {
    wx.chooseImage({
      count: 1,
      sizeType: ['original', 'compressed'],
      sourceType: ['album', 'camera'],
      success:(res)=> {
        console.log('图片地址', res)
        // tempFilePath可以作为img标签的src属性显示图片
        const tempFilePaths = res.tempFilePaths[0]
        this.setData({
          imgUrl: tempFilePaths,
        })
      }
    })
  },
  // 获取孩子信息
  getChildDetails(id) {
    wx.request({
      url: app.globalData.url + 'api/user/child/detail',
      data: {
        token: app.globalData.token,
        child_id: id
      },
      method: 'post',
      success: res => {
        console.log('获取孩子详情接口返回', res)
        let details = res.data.data;
        wx.setNavigationBarTitle({
          title: res.data.data.name,
        })
        this.data.sexItems.forEach(item => {
          if (item.sex == details.sex) {
            item.checked = 'true'
          }
        })
        this.setData({
          haiziDetails: res.data.data,
          region1: details.prov + details.city + details.area,
          region2: details.account_prov + details.account_city
        })
      }
    })
  },
  // 改变性别
  radioChange: function(e) {
    console.log('radio发生change事件，携带value值为：', e.detail.value)
  },
  // 改变家庭地址
  bindRegionChange1(e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      region1: e.detail.value
    })
  },
  // 改变户口所在地址
  bindRegionChange2(e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      region2: e.detail.value
    })
  },
  // 提交体验课
  formSubmit(e) {
    console.log(e)
    let params = {};
     
    // wx.request({
    //   url: app.globalData.url + 'api/user/child/update',
    //   data: params,
    //   method: 'post',
    //   success: res => {
    //     console.log('提交体验课接口返回', res)

    //     if (res.statusCode == 200) {
    //       wx.showToast({
    //         title: '预定成功',
    //         icon: 'success',
    //         duration: 2000,
    //         success: function() {
    //           setTimeout(_ => {
    //             wx.navigateBack({
    //               delta: 2
    //             })
    //           }, 2000)

    //         }
    //       })
    //     }
    //   }
    // })
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