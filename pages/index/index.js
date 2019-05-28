//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    motto: 'Hello World',
    imgList: [],
    imgUrls: [
      'https://images.unsplash.com/photo-1551334787-21e6bd3ab135?w=640',
      'https://images.unsplash.com/photo-1551214012-84f95e060dee?w=640',
      'https://images.unsplash.com/photo-1551446591-142875a901a1?w=640'
    ],
    statusBarHeight: app.globalData.statusBarHeight,
    page: 1,
    pageNum: 3
  },
  //事件处理函数  
  onLoad: function() {
    this.getAddress()
  },
  onShow: function() {
    // this.getImage()
    // this.getNew()
  },
  // 跳转至预约
  appointment() {
    wx.navigateTo({
      url: '/pages/appointment/appointment'
    })
  },
  goShopList(){
    wx.navigateTo({
      url: '/pages/storeList/storeList'
    })
  },
  // 跳转至更多新闻
  moreNew(e) {
    console.log(e)
    if (e.currentTarget.id == '') {
      wx.navigateTo({
        url: '/pages/nnews/nnews'
      })
    } else {
      console.log('详情')
    }

  },
  // 获取地理位置
  getAddress() {
    wx.request({
      url: app.globalData.url + 'api/user/upsite',
      data: {
        lng: app.globalData.lnt,
        lat: app.globalData.lat
      },
      method: 'post',
      success: res => {
        console.log(res)
      }
    })
  },

  // 获取图片
  getImage() {
    wx.request({
      url: app.globalData.url + 'api/banner/list',
      method: 'POST',
      data: {
        store_id: "0"
      },
      success: (res) => {
        this.data.imgList = res.data.data
        console.log(this.data)
      }
    })
  },
  // 获取新闻列表
  getNew() {
    wx.request({
      url: app.globalData.url + 'api/info/list',
      method: 'POST',
      data: {
        store_id: '3',
        page: this.data.page,
        pagesize: this.data.pageNum
      },
      success: res => {
        console.log(res)
      }
    })
  },
  trainDetails(event) {
    console.log(event)
  }

})