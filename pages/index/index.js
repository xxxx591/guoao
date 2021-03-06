//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    motto: 'Hello World',
    imgList: [],
    imgUrls: [],
    statusBarHeight: app.globalData.statusBarHeight,
    page: 1,
    pageNum: 3,
    shopName: '',
    newsList: [],
    coachList: [],
    curriculumList: [],
    experience: {},
    showExperience: true,
    accShow: false,
    optID: '', 
  },
  onPullDownRefresh() {
    if (this.data.optID) {
      this.isShowExperience()
      this.getNearbyShop02(this.data.optID)
    } else {
      this.isShowExperience()
      this.getNearbyShop()
    }
  },
  //事件处理函数  
  onLoad: function(options) {
    wx.showLoading({})
    this.setData({
      optID: options.id
    })
    console.log(options)
    if (this.data.optID) {
      this.isShowExperience()
      this.getNearbyShop02(this.data.optID)
    } else {
      this.isShowExperience()
      this.getNearbyShop()
    }
  },
  onShow: function() {
    this.isShowExperience()
    let flag = wx.getStorageSync('dayShow')
    if (app.globalData.prompt.days <= 29 && flag && app.globalData.prompt.flag == 0){
      wx.showModal({
        content: `您的合同【${app.globalData.prompt.name}】还有 ${app.globalData.prompt.days} 天到期，请 联系客服 进行续费` ,
        cancelText:'忽略',
        confirmText:'查看',
        success:res=>{
            wx.setStorageSync('dayShow', false)
          wx.request({
            url: app.globalData.url + 'api/user/prompt',
            data: {
              token: app.globalData.token,
              contract_id: '' + app.globalData.prompt.contract_id
            },
            method: 'post',
            success: res => {
               console.log('asdasdasdas',res)
            }
          })
          if(res.confirm){
            console.log('用户点击确定')
            wx.navigateTo({
              url: '/pages/contractDetail/contractDetail?status_id=' + app.globalData.prompt.contract_id,
            })
          }
        }
      })
    }
  },
  // 是否显示体验课
  isShowExperience() {
    wx.request({
      url: app.globalData.url + 'api/user/course',
      data: {
        token: app.globalData.token,
      },
      method: 'post',
      success: res => {
        console.log('是否显示体验课返回', res)
        if (!(JSON.stringify(res.data.data) == "{}")) {
          this.setData({
            showExperience: false
          })
        }
        this.setData({
          experience: res.data.data
        })
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
        wx.setStorage({
          key: "storeId",
          data: res.data.data[0].id
        })
        this.getBannerList(res.data.data[0].id);
        this.getNewsList(res.data.data[0].id);
        this.getCoachList(res.data.data[0].id);
        this.getCurriculumList(res.data.data[0].id)
      }
    })
  },
  // 获取最近门店选择门店版本
  getNearbyShop02(id) {
    wx.request({
      url: app.globalData.url + 'api/user/store',
      data: {
        token: app.globalData.token,
      },
      method: 'post',
      success: res => {
        console.log('附近门店接口返回', res)
        let arr = res.data.data
        arr.forEach(item => {
          console.log(item.id)
          if (item.id == id) {
            this.setData({
              shopName: item.name,
              shopId: item.id
            })
          }
        })
        this.getBannerList(id);
        this.getNewsList(id);
        this.getCoachList(id);
        this.getCurriculumList(id)
      }
    })
  },
  // 获取教练团队
  getCoachList(id) {
    wx.request({
      url: app.globalData.url + 'api/coach/list',
      data: {
        store_id: id,
        page: 1,
        pagesize: 10
      },
      method: 'post',
      success: res => {
        wx.hideLoading()

        console.log('获取教练团队接口返回', res)
        this.setData({
          coachList: res.data.data.data,
          accShow: true
        })
      }
    })
  },
  // 获取推荐课程
  getCurriculumList(id) {
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
        wx.stopPullDownRefresh()
      }
    })
  },
  // 获取新闻列表
  getNewsList(id) {
    wx.request({
      url: app.globalData.url + 'api/info/list',
      data: {
        store_id: id,
        page: 1,
        pagesize: 2
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
  getBannerList(id) {
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
  appointment(e) {
    wx.navigateTo({
      url: '/pages/appointment/appointment?courseId=' + e.currentTarget.id + "&name=" + e.currentTarget.dataset.name,
    })
  },
  goShopList() {
    wx.navigateTo({
      url: '/pages/storeList/storeList'
    })
  },
  // 跳转至新闻详情
  NewDetails(e) {
    wx.navigateTo({
      url: '/pages/detailsNews/detailsNews?id=' + e.currentTarget.id
    })
  },
  // 获取课程列表
  moreCourse() {
    wx.navigateTo({
      url: '/pages/all-course/course?id=' + this.data.shopId
    })
  },
  // 获取课程列表
  moreNew() {
    wx.navigateTo({
      url: '/pages/nnews/nnews?id=' + this.data.shopId
    })
  },
  // 跳转至课程详情
  storeDetails(e) {
    console.log(e)
    wx.navigateTo({
      url: '/pages/course-details/courseDetails?id=' + e.currentTarget.id
    })
  },

  newsMore() {
    wx.navigateTo({
      url: '/pages/introduction/introduction?id=' + this.data.shopId,
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
  trainDetails(e) {
    wx.navigateTo({
      url: '/pages/details/details?id=' + e.currentTarget.dataset.id,
    })
  }

})