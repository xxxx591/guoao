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
    region1: '点击选择',
    region2: '点击选择',
    customItem: '全部',
    sexItems: [{
        sex: 1,
        value: '男',
        checked: 'false'
      },
      {
        sex: 2,
        value: '女',
        checked: 'false'
      },
    ],
    params: {
      childImg: '',
      sex: '',
    },
    disAbled: true,
    flag: true
  },

  /**
   * 生命周期函数--监听页面加载
   */

  onLoad: function(options) {
    console.log(options)
    this.setData({
      child_id: options.id
    })
    if (!(options.id == 'null')) {
      this.getChildDetails(options.id)
    }

  },
  // 修改图片
  changerPhoto() {
    let that = this
    wx.chooseImage({
      count: 1,
      sizeType: ['original', 'compressed'],
      sourceType: ['album', 'camera'],
      success: (res) => {
        console.log('图片地址', res)
        // tempFilePath可以作为img标签的src属性显示图片
        let tempFilePaths = res.tempFilePaths[0]
        wx.uploadFile({
          url: app.globalData.url + 'common/uploadOnce',
          filePath: tempFilePaths,
          name: 'file',
          formData: {
            model: 'user'
          },
          success(res) {
            console.log(res.data)
            let data = JSON.parse(res.data)
            that.setData({
              imgUrl: tempFilePaths,
              'haiziDetails.avatar': tempFilePaths
            })
            //do something
          }
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
    let sex = this.data.params.sex;
    this.setData({
      'haiziDetails.sex': e.detail.value
    })
  },
  // 改变家庭地址
  bindRegionChange1(e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    let arrlist = e.detail.value
    this.setData({
      region1: arrlist,
      'haiziDetails.prov': arrlist[0],
      'haiziDetails.city': arrlist[1],
      'haiziDetails.area': arrlist[2],
    })
  },
  // 改变户口所在地址
  bindRegionChange2(e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    let arrlist = e.detail.value
    let prov = this.data.params.account_prov
    let city = this.data.params.account_city
    this.setData({
      region2: arrlist,
      'haiziDetails.account_prov': arrlist[0],
      'haiziDetails.account_city': arrlist[1],
    })
  },
  // 修改孩子信息
  formSubmit(e) {
    if (this.data.flag) {
      this.setData({
        flag: false
      })
      console.log(e)
      this.setData({
        'haiziDetails.address': e.detail.value.addressdetails,
        'haiziDetails.school': e.detail.value.school,
      })
      let params = JSON.parse(JSON.stringify(this.data.haiziDetails));
      console.log(params)
      params.sex = parseInt(params.sex);
      params.token = app.globalData.token;
      if (!(this.data.child_id == 'null')) {
        params.child_id = this.data.child_id
      }
      params.name = e.detail.value.name
      params.id_card = e.detail.value.id_card
      if (params.name == '') {
        wx.showToast({
          title: '请输入孩子姓名',
          icon: 'none',
          duration: 1000,
        })
        return
      }
      wx.request({
        url: app.globalData.url + 'api/user/child/update',
        data: params,
        method: 'post',
        success: res => {
          console.log('修改孩子信息接口返回', res)
          if (res.statusCode == 200) {

            wx.showToast({
              title: '修改成功',
              icon: 'success',
              duration: 2000,
              success: function() {
                setTimeout(_ => {
                  wx.navigateBack({
                    delta: 2
                  })
                }, 2000)
              }
            })
          } else {
            wx.showToast({
              title: res.data.error_msg,
              icon: 'none',
              duration: 1000,

            })
          }
        }
      })
    } else {
      setTimeout(item => {
        this.setData({
          flag: true
        })
      }, 5000)
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