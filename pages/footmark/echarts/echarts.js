// pages/footmark/echarts/echarts.js
const app = getApp()
import * as echarts from '../../../ec-canvas/echarts.js';
import option from "./bar.js"

Page({

  /**
   * 页面的初始数据
   */
  data: {
    time: '',
    cid: 3,
    echarts: {},
    ecBar: {
      lazyLoad: true // 延迟加载
    },
    ecBar2: {
      lazyLoad: true // 延迟加载
    }

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    this.barComponent = this.selectComponent('#mychart-dom-bar');
    this.barComponent2 = this.selectComponent('#mychart-dom-bar2');

    this.init_bar();
    this.init_bar2();

    this.setData({
      time: this.getNowFormatDate(),
      cid: options.cid
    })
  },
  init_bar: function() {
    this.barComponent.init((canvas, width, height) => {
      // 初始化图表
      const barChart = echarts.init(canvas, null, {
        width: width,
        height: height
      });
      let options = JSON.parse(JSON.stringify(option))
      let params = {
        token: app.globalData.token,
        child_id: this.data.cid,
        created_at: this.data.time
      }
      app.post(app.globalData.url + 'api/user/child/report/detail', params).then(res => {
        console.log('res', res)
        let details = res.data.data
        // arr1 是均值 arr2 是个人
        let arr1 = [];
        let arr2 = []
        details.forEach(item => {
          if (item.status == 1 && item.type > 5) {
            arr1.push({
              value: item.score
            })
          } else if (item.status == 2 && item.type > 5) {

            arr2.push({
              value: item.score
            })
          }
        })
        if (arr1.length != 5) {
          for (let i = 0; i < 6; i++) {
            arr1.push({
              value: 0
            })
          }
        }
        if (arr2.length != 5) {
          for (let i = arr2.length; i < 5; i++) {
            arr2.push({
              value: 0
            })
          }
        }
        for (var k = 0; k < 5; k++) {
          let num = parseInt((arr2[k].value - arr1[k].value) / arr1[k].value * 100)
          if (num >= 0) {
            num = `↑ ${num}`
            arr2[k].name = num
          } else {
            num = `↓ ${Math.abs(num)}`
            arr2[k].label = {
              color: "#F45342"
            }
            arr2[k].name = num
          }
        }
        options.series[0].data = arr1
        options.series[1].data = arr2
        console.log(options)
        console.log('arr1', arr1)
        console.log('arr2', arr2)
        barChart.setOption(options);
      })
      // 注意这里一定要返回 chart 实例，否则会影响事件处理等
      return barChart;
    });
  },
  init_bar2: function() {
    this.barComponent2.init((canvas, width, height) => {
      // 初始化图表
      const barChart = echarts.init(canvas, null, {
        width: width,
        height: height
      });
      let options = JSON.parse(JSON.stringify(option))
      options.xAxis['0'].data = ['速度', '力量', '速度耐力', '柔韧', '灵敏']
      let params = {
        token: app.globalData.token,
        child_id: this.data.cid,
        created_at: this.data.time
      }
      app.post(app.globalData.url + 'api/user/child/report/detail', params).then(res => {
        console.log('res', res)
        let details = res.data.data
        // arr1 是均值 arr2 是个人
        let arr1 = [];
        let arr2 = []
        details.forEach(item => {
          if (item.status == 1 && item.type <= 5) {
            arr1.push({
              value: item.score
            })
          } else if (item.status == 2 && item.type <= 5) {

            arr2.push({
              value: item.score
            })
          }
        })
        if (arr1.length != 5) {
          for (let i = 0; i < 6; i++) {
            arr1.push({
              value: 0
            })
          }
        }
        if (arr2.length != 5) {
          for (let i = arr2.length; i < 5; i++) {
            arr2.push({
              value: 0
            })
          }
        }
        for (var k = 0; k < 5; k++) { 
          let num = parseInt((arr2[k].value - arr1[k].value) / arr1[k].value * 100)
          if (num >= 0) {
            num = `↑ ${num}`
            arr2[k].name = num
          } else {
            num = `↓ ${Math.abs(num)}`
            arr2[k].label = {
              color: "#F45342"
            }
            arr2[k].name = num
          }
        }
        options.series[0].data = arr1
        options.series[1].data = arr2
        console.log(options)
        console.log('arr1', arr1)
        console.log('arr2', arr2)
        barChart.setOption(options);
      })
      // 注意这里一定要返回 chart 实例，否则会影响事件处理等
      return barChart;
    });
  },


  // 获取当前时间
  getNowFormatDate() {
    var date = new Date();
    var seperator1 = "-";
    var year = date.getFullYear();
    var month = date.getMonth() + 1;
    if (month >= 1 && month <= 9) {
      month = "0" + month;
    }
    var currentdate = year + seperator1 + month;
    return currentdate;
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