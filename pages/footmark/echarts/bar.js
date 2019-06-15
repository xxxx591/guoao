var option = {
  grid: {
    left: "10%",
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
          show: false, //开启显示
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
          formatter: '{b}%',
          textStyle: {
            //数值样式
            color: "#006428",
            fontSize: 10
          }
        }
      }
    },
  },
  ]
};
export default option