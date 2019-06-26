// pages/appointment/appointment.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    storeId: '',
    courseId: '',
    flag: true
  },

  /**
   * 生命周期函数--监听页面加载
   */
  // 提交体验课
  formSubmit(e) {
    let _this = this
    let params = {};
    params.token = app.globalData.token;
    params.store_id = _this.data.storeId;
    params.name = e.detail.value.name;
    params.mobile = e.detail.value.mobile;
    params.age = e.detail.value.age;
    params.school = e.detail.value.school;
    if (_this.data.courseId == null) {
      console.log(_this.data)
    } else {
      params.course_id = parseInt(_this.data.courseId)
    }
    if (_this.data.flag) {
      _this.setData({
        flag: false
      })
      if (e.detail.value.name.length <= 0) {
        wx.showToast({
          title: '请输入家长姓名',
          icon: "none",
          duration: 2000,
          success: res => {
            _this.setData({
              flag: true
            })
          }
        })
      } else if (!(/^1[3456789]\d{9}$/.test(e.detail.value.mobile))) {
        wx.showToast({
          title: '请输入正确的手机号',
          icon: "none",
          duration: 2000,
          success: res => {
            _this.setData({
              flag: true
            })
          }
        })
      } else if (e.detail.value.age <= 0) {
        wx.showToast({
          title: '请输入孩子年龄',
          icon: "none",
          duration: 2000,
          success: res => {
            _this.setData({
              flag: true
            })
          }
        })
      } else if (e.detail.value.school.length < 0) {
        wx.showToast({
          title: '请输入所在校区',
          icon: "none",
          duration: 2000,
          success: res => {
            _this.setData({
              flag: true
            })
          }
        })
      } else {
        // wx.request({
        //   url: app.globalData.url + 'api/course/signUp',
        //   data: params,
        //   method: 'post',
        //   success: res => {
        //     console.log('提交体验课接口返回', res)
        //     if (res.data.error_code == 0) {
        //       wx.showToast({
        //         title: '预定成功',
        //         icon: 'success',
        //         duration: 2000,
        //         success: function() {
        //           setTimeout(_ => {
        //             wx.navigateBack({
        //               delta: 2
        //             })
        //           }, 1000)

        //         }
        //       })
        //     } else {
        //       wx.showToast({
        //         title: res.data.error_msg,
        //         icon: 'none',
        //         duration: 2000,
        //       })
        //     }
        //   }
        // })
      }
    } else {
      setTimeout(() => {
        _this.setData({
          flag: true
        })
      }, 1000)
    }
  },

  onLoad: function(options) {
    console.log(options)
    
    if (options.name == '' || options.courseId == '') {
      console.log('123')
      wx.setNavigationBarTitle({
        title: '预约体验课',
      })
    } else {
      wx.setNavigationBarTitle({
        title: options.name,
      })
    }
    this.setData({
      courseId: options.courseId
    })
    wx.getStorage({
      key: 'storeId',
      success: res => {
        this.data.storeId = res.data
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
  backHome() {
    wx.redirectTo({
      url: '/pages/init/init?id=1',
    })
  },
  onShareAppMessage: function() {
    return {
      title: '预约体验课',
      path: '/pages/appointment/appointment?courseId=&name=',
    }
  }
})