// pages/footmark/assess/assess.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    kDetails: {},
    score: 1, //评价分数
    scoreArray: [1, 2, 3, 4, 5], //分为1-5个评分层次
    scoreText: ['1星', '2星', '3星', '4星', '5星'], //评分列表
    scoreContent: '', //文字显示评分情况
    tagList: [],
    type: '',
    kid: '',
    cid: '',
    haiziDetails: {},
    flag: true,
    jiaolianDetails:{}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    wx.showLoading({
      
    })
    let _this = this
    this.getChildDetails(options.cid)
    this.getTagList()
    wx.getStorage({
      key: 'jiaolian',
      success(res) {
        console.log(res.data)
        _this.setData({
          jiaolianDetails:res.data
        })
      }
    })
    this.setData({
      kid: options.kid,
      cid: options.cid,
    })
  },
  // 获取tag列表
  getTagList() {
    let that = this
    wx.getStorage({
      key: 'storeId',
      success(res) {
        console.log()
        wx.request({
          url: app.globalData.url + 'common/getLabel',
          data: {
            belong: 1,
            store_id: res.data, 
            type:2
          },
          method: 'post',
          success: res => {
            wx.hideLoading()
            console.log('获取tag列表接口返回', res)
            let arr = res.data.data;
            arr.forEach(item => {
              item.type = false
            })
            that.setData({
              tagList: arr
            })
          }
        })
      }
    })

  },
  // 评价接口
  formSubmit(e) {
    let _this = this
    if (_this.data.flag) {
      _this.setData({
        flag: false
      })
      console.log(e)
      let label_id = [];
      (_this.data.tagList).forEach(item => {
        if (item.type == true) {
          label_id.push(item.id)
        }
      })
      let params = {};
      params.token = app.globalData.token;
      params.team_library_id = parseInt(_this.data.kid),
        params.child_id = parseInt(_this.data.cid);
      params.score = parseInt(_this.data.score);
      params.content = e.detail.value.textarea;
      params.label_id = label_id;
      if (params.label_id.length == 0) {
        wx.showToast({
          title: '请选择至少一个标签',
          icon: 'none',
          duration: 2000
        })
      } else {
        wx.request({
          url: app.globalData.url + 'api/footprint/course/assess',
          data: params,
          method: 'post',
          success: res => {
            console.log('评价接口返回', res)
            if (res.data.error_code == 0) {
              wx.showToast({
                title: '评价成功',
                icon: 'success',
                duration: 2000,
                success: function() {
                  setTimeout(_ => {
                    wx.navigateBack({
                      delta: 2
                    })
                  }, 1000)

                }
              })
            } else {
              wx.showToast({
                title: res.data.error_msg,
                icon: 'none',
                duration: 2000,
                success: function() {}
              })
            }
          }
        })
      }
    } else {
      setTimeout(item => {
        _this.setData({
          flag: true
        })
      }, 1000)
    }
  },
  // 点击切换class
  selectOn(e) {
    console.log(e)
    let index = e.currentTarget.dataset.id
    console.log(index)
    var item = "tagList[" + index + "].type";
    if (this.data.tagList[index].type == true) {
      console.log(item)
      this.setData({
        [item]: false
      })
    } else {
      this.setData({
        [item]: true
      })
    }
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


        this.setData({
          haiziDetails: res.data.data,
        })
      }
    })
  },
  // 评分
  changeScore: function(e) {
    let that = this
    console.log(e) //控制台触摸事件信息
    that.setData({
      score: e.currentTarget.id,
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