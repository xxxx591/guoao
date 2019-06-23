// pages/gameDetail/gameDetail.js
const app = getApp()
var WxParse = require('../wxParse/wxParse.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    dataList: null,
    gameId: null,
    stuName: null,
    stuHeight: null,
    stuWeight: null,
    flag: true,
    accShow:false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    wx.showLoading({
      
    })
    this.setData({
      gameId: options.game_id
    })
    wx.request({
      url: app.globalData.url + 'api/game/detail',
      data: {
        token: app.globalData.token,
        game_id: this.data.gameId
      },
      method: 'post',
      success: res => {
        wx.hideLoading()
        console.log('比赛详情列表>>', res.data.data)
        let arrayList = res.data.data
        let article = res.data.data.desc
        WxParse.wxParse('article', 'html', article, this, 5);
        arrayList.started_at = arrayList.started_at.split(' ')[0]
        arrayList.ended_at = arrayList.ended_at.split(' ')[0]
        this.setData({
          dataList: arrayList,
          accShow:true
        })
      }
    })
  },

  stuName(e) {
    this.setData({
      stuName: e.detail.value
    })
  },
  stuHeight(e) {
    this.setData({
      stuHeight: e.detail.value
    })
  },
  stuWeight(e) {
    this.setData({
      stuWeight: e.detail.value
    })
  },
  /**
   * @desc:调教表单
   * @author:llc
   */
  handleSubmit(e) {
    console.log(e)
    if (this.data.flag) {
      this.setData({
        flag: false
      })

      let item = e.value
      console.log(item)
      if (JSON.stringify(item) == '[]') {
        wx.showToast({
          title: '缺少学生参数，请联系客服',
          icon: 'none',
          duration: 2000
        })
      } else {
        const query = {
          token: app.globalData.token,
          game_id: this.data.gameId,
          content: []
        }
        let contentArr = []
        for (let val in e.detail.value) {
          contentArr.push(e.detail.value[val])
        }
        for (let k = 0; k < this.data.dataList.get_game_element.length; k++) {
          query.content.push({
            'game_element_id': this.data.dataList.get_game_element[k].id,
            'content': contentArr[k]
          })
        }
        console.log(query)
        if (contentArr.indexOf('') != -1) {
          wx.showToast({
            title: '请填写报名内容',
            icon: 'none'
          })
        } else {
          wx.request({
            url: app.globalData.url + 'api/game/join/add',
            data: query,
            method: 'post',
            success: res => {
              console.log('提交表单返回>>', res.data.data)
              if (res.data.error_code == 0) {
                wx.showToast({
                  title: '报名成功',
                  icon: 'success',
                  duration: 2000,
                  success: function() {
                    setTimeout(_ => {
                      wx.navigateBack({
                        delta: 1
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


      }
    } else {
      setTimeout(() => {

        this.setData({
          flag: true
        })
      }, 1000)
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