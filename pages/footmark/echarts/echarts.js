// pages/footmark/echarts/echarts.js
const app = getApp()
import * as echarts from '../../../ec-canvas/echarts.js';
let chart = null;
function initChart(canvas, width, height) {
  chart = echarts.init(canvas, null, {
    width: width,
    height: height
  });
  canvas.setChart(chart);

  var option = {
    grid: {
      left: "15%",
      right: "7%",
      top: '10%',
      bottom: "10%"
    },
    tooltip: {
      trigger: 'axis'
    },
    xAxis: [{
      type: 'category',
      data: ['颠球', '拉球', '绕八字', '停球', '脚法']
    }],
    yAxis: [

      {
        axisLabel: {
          show: false
        },
        splitLine: { //网格线
          show: false
        },

        axisTick: { //y轴刻度线
          show: false
        },
        name: "峰值",
        nameTextStyle: {
          padding: [0, 40, -10, 0]
        },
        type: 'value',
      }
    ],
    series: [{
        name: '平均分',
        color: ["#E5E5E5"],
        type: 'bar',
        data: [2.6, 5.9, 9.0, 26.4, 28.7],
        itemStyle: {
          normal: {
            label: {
              show: true, //开启显示
              position: "top", //在上方显示
              formatter: '{c}%'　,
              textStyle: {
                //数值样式
                color: "#333",
                fontSize: 10
              }
            }
          }
        },
      },
      {
        name: '个人得分',
        color: ["#006428"],
        type: 'bar',
        data: [2.0, 4.9, 7.0, 23.2, 25.6],
        itemStyle: {
          normal: {
            label: {
              show: true, //开启显示
              position: "top", //在上方显示
              textStyle: {
                //数值样式
                color: "#333",
                fontSize: 10
              }
            }
          }
        },
      },
    ]
  };

  chart.setOption(option);
  return chart;
}

Page({
   
  /**
   * 页面的初始数据
   */
  data: {
    time: '',
    cid:'',
    echarts: {},
    ecBar: {
      lazyLoad: true // 延迟加载
    },
     
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    this.barComponent = this.selectComponent('#mychart-dom-bar');
    this.init_bar();
    this.setData({
      time: this.getNowFormatDate(),
      cid:options.cid
    })
    this.getDetails(options.cid)
  },
  init_bar: function () {
    this.barComponent.init((canvas, width, height) => {
      // 初始化图表
      const barChart = echarts.init(canvas, null, {
        width: width,
        height: height
      });
      barChart.setOption(this.getDetails(this.data.cid));
      // 注意这里一定要返回 chart 实例，否则会影响事件处理等
      return barChart;
    });
  },
  // 获取echarts数据
  getDetails(cid) {
    // wx.request({
    //   url: app.globalData.url + 'api/user/child/report/detail',
    //   data: {
    //     token: app.globalData.token,
    //     child_id: parseInt(cid),
    //     created_at: this.data.time
    //   },
    //   method: 'post',
    //   success: res => {
    //     console.log('获取echarts数据接口返回', res)
    //     this.setData({
    //       echarts: res.data.data
    //     })
    //   }
    // })
    var option = {
      grid: {
        left: "15%",
        right: "7%",
        top: '10%',
        bottom: "10%"
      },
      tooltip: {
        trigger: 'axis'
      },
      xAxis: [{
        type: 'category',
        data: ['颠球', '拉球', '绕八字', '停球', '脚法']
      }],
      yAxis: [

        {
          axisLabel: {
            show: false
          },
          splitLine: { //网格线
            show: false
          },

          axisTick: { //y轴刻度线
            show: false
          },
          name: "峰值",
          nameTextStyle: {
            padding: [0, 40, -10, 0]
          },
          type: 'value',
        }
      ],
      series: [{
        name: '平均分',
        color: ["#E5E5E5"],
        type: 'bar',
        data: [2.6, 5.9, 9.0, 26.4, 28.7],
        itemStyle: {
          normal: {
            label: {
              show: true, //开启显示
              position: "top", //在上方显示
              formatter: '{c}%'　,
              textStyle: {
                //数值样式
                color: "#333",
                fontSize: 10
              }
            }
          }
        },
      },
      {
        name: '个人得分',
        color: ["#006428"],
        type: 'bar',
        data: [2.0, 4.9, 7.0, 23.2, 25.6],
        itemStyle: {
          normal: {
            label: {
              show: true, //开启显示
              position: "top", //在上方显示
              textStyle: {
                //数值样式
                color: "#333",
                fontSize: 10
              }
            }
          }
        },
      },
      ]
    };
    return option
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
    setTimeout(function() {
      // 获取 chart 实例的方式
      console.log(chart)
    }, 2000);
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