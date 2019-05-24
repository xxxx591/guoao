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
    console.log(this.data)
  },
  onShow: function() {
    this.getImage()
    this.getNew()
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