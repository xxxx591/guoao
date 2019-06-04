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
    pageNum: 3,
    shopName: '123',
    newsList:[],
    coachList:[],
    curriculumList:[]
  },
  //事件处理函数  
  onLoad: function() {
    this.isShowExperience()
    this.getNearbyShop()
  },
  onShow: function() {
    // this.getImage()
    // this.getNew()
  },
  // 是否显示体验课
  isShowExperience(){
    wx.request({
      url: app.globalData.url + 'api/user/course',
      data: {
        token: app.globalData.token,
      },
      method: 'post',
      success: res => {
        console.log('是否显示体验课返回', res)
        
      }
    })
  },
  // 获取最近门店
  getNearbyShop() {
    wx.request({
      url: app.globalData.url + 'api/user/store',
      data: {
        token: app.globalData.token,
      },
      method: 'post',
      success: res => {
        console.log('附近门店接口返回', res)
        this.setData({
          shopName: res.data.data[0].name,
          shopId: res.data.data[0].id
        })
        this.getBannerList(res.data.data[0].id);
        this.getNewsList(res.data.data[0].id);
        this.getCoachList(res.data.data[0].id);
        this.getCurriculumList(res.data.data[0].id)
      }
    })
  },
  // 获取教练团队
  getCoachList(id){
    wx.request({
      url: app.globalData.url + 'api/coach/list',
      data: {
        store_id: id,
        page: 1,
        pagesize: 10
      },
      method: 'post',
      success: res => {
        console.log('获取教练团队接口返回', res)
        this.setData({
          coachList: res.data.data.data
        })
      }
    })
  },
  // 获取推荐课程
  getCurriculumList(id){
    wx.request({
      url: app.globalData.url + 'api/course/list',
      data: {
        store_id: id,
        page: 1,
        pagesize: 10
      },
      method: 'post',
      success: res => {
        console.log('获取推荐课程接口返回', res)
        this.setData({
          curriculumList: res.data.data.data
        })
      }
    })
  },
  // 获取新闻列表
  getNewsList(id){
    wx.request({
      url: app.globalData.url + 'api/info/list',
      data: {
        store_id: id,
        page:1,
        pagesize:2
      },
      method: 'post',
      success: res => {
        console.log('获取新闻列表接口返回', res)
         this.setData({
           newsList: res.data.data.data
         })
      }
    })
  },
  // 获取banner图组
  getBannerList(id){
    wx.request({
      url: app.globalData.url + 'api/banner/list',
      data: {
        store_id: id,
      },
      method: 'post',
      success: res => {
        console.log('获取banner图组返回', res)
        this.setData({
          imgUrls: res.data.data,

        })
      }
    })
  },
  // 跳转至预约
  appointment() {
    wx.navigateTo({
      url: '/pages/appointment/appointment'
    })
  },
  goShopList() {
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