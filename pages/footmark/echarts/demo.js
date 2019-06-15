import * as echarts from '../../ec-canvas/echarts';
Page({
  data: {
    ecBar: {
      lazyLoad: true // 延迟加载
    },
    ecScatter: {
      lazyLoad: true
    }
  },
  onLoad() {
    this.barComponent = this.selectComponent('#mychart-dom-multi-bar');
    this.scaComponnet = this.selectComponent('#mychart-dom-multi-scatter');
    this.init_bar();
    this.init_sca();
  },
  init_bar: function () {
    this.barComponent.init((canvas, width, height) => {
      // 初始化图表
      const barChart = echarts.init(canvas, null, {
        width: width,
        height: height
      });
      barChart.setOption(this.getBarOption());
      // 注意这里一定要返回 chart 实例，否则会影响事件处理等
      return barChart;
    });
  },
  init_sca: function () {
    this.scaComponnet.init((canvas, width, height) => {
      // 初始化图表
      const scaChart = echarts.init(canvas, null, {
        width: width,
        height: height
      });
      scaChart.setOption(this.getScaOption());
      // 注意这里一定要返回 chart 实例，否则会影响事件处理等
      return scaChart;
    });
  },
  getBarOption: function () {
    //return 请求数据
    return {
      color: ['#37a2da', '#32c5e9', '#67e0e3'],
      tooltip: {
        trigger: 'axis',
        axisPointer: {      // 坐标轴指示器，坐标轴触发有效
          type: 'shadow'    // 默认为直线，可选为：'line' | 'shadow'
        }
      },
      legend: {
        data: ['热度', '正面', '负面']
      },
      grid: {
        left: 20,
        right: 20,
        bottom: 15,
        top: 40,
        containLabel: true
      },
      xAxis: [
        {
          type: 'value',
          axisLine: {
            lineStyle: {
              color: '#999'
            }
          },
          axisLabel: {
            color: '#666'
          }
        }
      ],
      yAxis: [
        {
          type: 'category',
          axisTick: { show: false },
          data: ['汽车之家', '今日头条', '百度贴吧', '一点资讯', '微信', '微博', '知乎'],
          axisLine: {
            lineStyle: {
              color: '#999'
            }
          },
          axisLabel: {
            color: '#666'
          }
        }
      ],
      series: [
        {
          name: '热度',
          type: 'bar',
          label: {
            normal: {
              show: true,
              position: 'inside'
            }
          },
          data: [300, 270, 340, 344, 300, 320, 310]
        },
        {
          name: '正面',
          type: 'bar',
          stack: '总量',
          label: {
            normal: {
              show: true
            }
          },
          data: [120, 102, 141, 174, 190, 250, 220]
        },
        {
          name: '负面',
          type: 'bar',
          stack: '总量',
          label: {
            normal: {
              show: true,
              position: 'left'
            }
          },
          data: [-20, -32, -21, -34, -90, -130, -110]
        }
      ]
    };
  },
  getScaOption: function () {
    //请求数据 
    var data = [];
    var data2 = [];
    for (var i = 0; i < 10; i++) {
      data.push(
        [
          Math.round(Math.random() * 100),
          Math.round(Math.random() * 100),
          Math.round(Math.random() * 40)
        ]
      );
      data2.push(
        [
          Math.round(Math.random() * 100),
          Math.round(Math.random() * 100),
          Math.round(Math.random() * 100)
        ]
      );
    }
    var axisCommon = {
      axisLabel: {
        textStyle: {
          color: '#C8C8C8'
        }
      },
      axisTick: {
        lineStyle: {
          color: '#fff'
        }
      },
      axisLine: {
        lineStyle: {
          color: '#C8C8C8'
        }
      },
      splitLine: {
        lineStyle: {
          color: '#C8C8C8',
          type: 'solid'
        }
      }
    };
    return {
      color: ["#FF7070", "#60B6E3"],
      backgroundColor: '#eee',
      xAxis: axisCommon,
      yAxis: axisCommon,
      legend: {
        data: ['aaaa', 'bbbb']
      },
      visualMap: {
        show: false,
        max: 100,
        inRange: {
          symbolSize: [20, 70]
        }
      },
      series: [{
        type: 'scatter',
        name: 'aaaa',
        data: data
      },
      {
        name: 'bbbb',
        type: 'scatter',
        data: data2
      }
      ],
      animationDelay: function (idx) {
        return idx * 50;
      },
      animationEasing: 'elasticOut'
    };
  },
});