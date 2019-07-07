// pages/gameList/gameList.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    type: 1,
    dataList: [],
    id:'',
    page:1,
    height:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  lower: function (e) {
    console.log(e)
    var index = this.data.page + 1
    this.setData({
      page: index
    })
    
    wx.showLoading({})
    wx.request({
      url: app.globalData.url + 'api/footprint/course/list',
      data: {
        token: app.globalData.token,
        child_id: parseInt(this.data.id),
        // child_id:2,
        type: this.data.type,
        page: index,
        pagesize: "8"
      },
      method: 'post',
      success: res => {
        wx.hideLoading()
        console.log('获取课程列表', res)
        let arrayList = res.data.data.data
        let data = res.data.data.data
        arrayList.map((item) => {
          item.ended_at = (item.ended_at.split(' ')[1]).substring(0, 5)
          item.started_at = (item.started_at).substring(5, 16)
        })
        let arr1 = this.data.dataList
        let arr2 = [...arr1, ...data]
        this.setData({
          dataList: arr2
        })
      }
    })
  },

  onLoad: function (options) {
    wx.getSystemInfo({
      success: (res) => {
        this.setData({
          height: res.windowHeight
        })
      }
    })
    wx.showLoading({
      
    })
    this.setData({
      id:options.id, 
    })
    // this.getRaceList(options.id, 1)
  },
  // 获取比赛详情
  handleGoOrder(e){
    console.log(e)
    wx.navigateTo({
      url: '/pages/footmark/raceDetails/raceDetails?kid=' + e.currentTarget.id + '&cid=' + this.data.id + "&type=" + e.currentTarget.dataset.type
    })
  },
  // 查看教练详情
  jiaolianDetails(e) {
    console.log(e)
    wx.navigateTo({
      url: '/pages/details/details?id=' + e.currentTarget.id
    })
  },
  // 获取列表
  getRaceList(id,type){
    wx.request({
      url: app.globalData.url + 'api/footprint/course/list',
      data: {
        token: app.globalData.token,
        child_id:parseInt(id),
        // child_id:2,
        type:type,
        page: this.data.page,
        pagesize: "8"
      },
      method: 'post',
      success: res => {
        wx.hideLoading()
        console.log('获取课程列表', res)
        let arrayList = res.data.data.data
        arrayList.map((item) => {
          item.ended_at = (item.ended_at.split(' ')[1]).substring(0, 5)
          item.started_at = (item.started_at).substring(5, 16)
        })
        this.setData({
          dataList:res.data.data.data
        })
      }
    })
  },
  // 切换至学生列表
  gostudent(e) {
    console.log(e)
    this.setData({
      dataList:[],
      page:1
    })
    wx.showLoading({})
    if (e.currentTarget.dataset.num == 1) {
      this.getRaceList(this.data.id,1)
      this.setData({
        type: e.currentTarget.dataset.num
      })
    } else {
      this.getRaceList(this.data.id,2)
      this.setData({
        type: e.currentTarget.dataset.num
      })

    }
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function (options) {
    this.getRaceList(this.data.id, 1)
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