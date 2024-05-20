import { EChartsOption, graphic } from 'echarts'

export const chartOpt: EChartsOption = {
  toolbox: {
    show: true,
    itemSize: 18,
    feature: {
      magicType: {
        type: ['line', 'bar']
      },
      saveAsImage: {
        type: 'png'
      }
    }
  },
  dataZoom: [
    {
      type: 'inside',
      xAxisIndex: 0,
      filterMode: 'filter'
    },
    {
      type: 'slider',
      xAxisIndex: 0,
      filterMode: 'filter'
    }
  ],
  tooltip: {
    show: true,
    trigger: 'axis',
    padding: 0,
    textStyle: {
      color: '#000',
      decoration: 'none'
    },
    formatter: function (params) {
      const showData = params[0].data
      // eslint-disable-next-line no-prototype-builtins
      const multyParams = showData.hasOwnProperty('value')
      let tipHtml =
        '<div style="height:100%;width:100%;min-width:300px;border-radius:5px;background:#fff;box-shadow:0 0 10px 5px #aaa">' +
        '    <div style="height:10%;width:100%;border-radius:5px;background:#F8F9F9;border-bottom:1px solid #F0F0F0">' +
        '        <span style="line-height:10%;margin-left:18px">' +
        params[0].name +
        '</span>' +
        '    </div>' +
        '    <div style="height:90%;width:100%;background:#fff;padding-bottom: 10px">' +
        '        <div style="padding-left:18px;padding-top:10px">' +
        '            <span style="display:inline-block;margin-right:5px;border-radius:10px;width:10px;height:10px;background-color:rgba(92,169,235,1)"></span> ' +
        '            <span>' +
        params[0].seriesName +
        '</span>' +
        '            <span style="float:right;margin-right:18px;margin-left:10px">'
      if (multyParams) {
        tipHtml += showData.value
      } else {
        tipHtml += showData
      }
      tipHtml = tipHtml + '</span>' + '        </div>'
      if (multyParams) {
        for (const key in showData) {
          if (key !== 'value') {
            tipHtml +=
              '        <div style="padding-left:18px;padding-top:14px">' +
              '<span style="line-height:10%;">' +
              key +
              '</span>' +
              '<br/>'
            showData[key].forEach((dt) => {
              tipHtml +=
                '            <span style="display:inline-block;margin-right:5px;width:10px;height:10px;background-color:rgba(92,169,235,1)"></span> ' +
                '            <span>' +
                dt.command +
                '</span>' +
                '<span style="float:right;margin-right:18px;margin-left:10px">' +
                dt.usageRate +
                '</span>' +
                '<br/>'
            })
            tipHtml += '        </div>'
          }
        }
      }
      tipHtml = tipHtml + '    </div>' + '</div>'
      return tipHtml
    },
    axisPointer: {
      type: 'cross',
      axis: 'x',
      label: {
        show: true,
        precision: 0,
        formatter: '{value}'
      }
    }
  },
  xAxis: {
    type: 'category',
    data: []
  },
  yAxis: {
    min: 0,
    max: 100
  },
  series: [
    {
      type: 'line',
      data: []
    }
  ]
}

function formatDuring(mss: number) {
  let days = mss / (1000 * 60 * 60 * 24)
  let dayss:string 
  if (days > 1) {
    dayss = days.toFixed(2)
  }else{
    dayss = "0"
  }

  const hours = (mss % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
  const minutes = (mss % (1000 * 60 * 60)) / (1000 * 60)
  const seconds = (mss % (1000 * 60)) / 1000
  return dayss + '天' + hours + '小时' + minutes + '分钟' + seconds + '秒'
}

// const dom = document.getElementById('container')
// const myChart = echarts.init(dom)
// const app = {}

const colors = ['#ccc', '#75d874', '#FFA500', '#FF0000'] //三种状态的颜色
const state = ['停机', '运行', '待机', '故障'] //三种状态
let abc = ''

export const rebootOpt: EChartsOption = {
  title: {
    text: '当前设备运行状态表',
    left: 'center',
    top: '1%'
  },
  color: colors,
  tooltip: {
    //提示框
    formatter: function (params) {
      abc = params
      return (
        params.name +
        ':<br/>' +
        (params.value[0] == 1
          ? '运行'
          : params.value[0] == 0
            ? '停机'
            : params.value[0] == 2
              ? '待机'
              : '故障') +
        '时间' +
        ': ' +
        params.value[1] +
        '~' +
        params.value[2] +
        '<br/>' +
        '总时长: ' +
        formatDuring(Date.parse(params.value[2]) - Date.parse(params.value[1])).slice(2)
      ) // (Math.abs(parseInt((new Date(params.value[3]).getTime() - new Date(params.value[2]).getTime()) / (1000 * 60 * 60 * 24))))
    } //数据的值
  },
  legend: {
    //图例
    data: ['停机', '运行', '待机', '故障'],
    top: '5%',
    selectedMode: false, // 图例设为不可点击
    textStyle: {
      color: '#000'
    },

    formatter: function (abc) {
      console.log(abc)
      const data = rebootOpt.series?.[4].data
      let tarValue = 0
      for (let i = 0; i < data.length; i++) {
        if (data[i].value[0] == 0) {
          data[i].value[0] = '停机'
        }
        if (data[i].value[0] == abc) {
          if (data[i].value[0] == '停机') {
            console.log(data[i])
            tarValue += Date.parse(data[i].value[2]) - Date.parse(data[i].value[1])
            console.log(formatDuring(tarValue))
          }
        }

        if (data[i].value[0] == 1) {
          data[i].value[0] = '运行'
        }
        if (data[i].value[0] == abc) {
          if (data[i].value[0] == '运行') {
            console.log(data[i])
            tarValue += Date.parse(data[i].value[2]) - Date.parse(data[i].value[1])
            console.log(formatDuring(tarValue))
          }
        }

        if (data[i].value[0] == 2) {
          data[i].value[0] = '待机'
        }
        if (data[i].value[0] == abc) {
          if (data[i].value[0] == '待机') {
            console.log(data[i])
            tarValue += Date.parse(data[i].value[2]) - Date.parse(data[i].value[1])
            console.log(formatDuring(tarValue))
          }
        }

        if (data[i].value[0] == 3) {
          data[i].value[0] = '故障'
        }
        if (data[i].value[0] == abc) {
          if (data[i].value[0] == '故障') {
            console.log(data[i])
            tarValue += Date.parse(data[i].value[2]) - Date.parse(data[i].value[1])
            console.log(formatDuring(tarValue))
          }
        }
      }
      const v = formatDuring(tarValue)
      const p = ((tarValue / 86400000) * 100).toFixed(2)
      return `${abc}(${p}%) ${v.slice(2)} `
    }
  },
  grid: {
    //绘图网格
    left: '6%',
    right: '6%',
    top: '10%',
    bottom: '10%'
  },
  xAxis: {
    type: 'time',
    //interval: 3600  * 2000,   //以一个小时递增
    //interval: 3600  * 1000,   //以一个小时递增
    min: '2023-01-10 08:00', //将data里最小时间的整点时间设为min,否则min会以data里面的min为开始进行整点递增
    axisLabel: {
      formatter: function (value) {
        console.log(value);
        const date = new Date(value)
        return getzf(date.getHours()) + ':00'

        function getzf(num) {
          // console.log(num);
          if (parseInt(num) < 10) {
            num = '0' + num
          }
          return num
        }
      }
    }
  },
  yAxis: {
    axisTick: {
      show: false //刻度线
    },
    data: ['焊接机器人']
  },
  series: [
    { name: '停机', type: 'bar', data: [] },
    { name: '运行', type: 'bar', data: [] }, // 用空bar来显示三个图例
    { name: '待机', type: 'bar', data: [] }, // 用空bar来显示三个图例
    { name: '故障', type: 'bar', data: [] }, // 用空bar来显示三个图例
    {
      type: 'custom',
      renderItem: function (params, api) {
        //开发者自定义的图形元素渲染逻辑，是通过书写 renderItem 函数实现的
        const categoryIndex = api.value(0) //这里使用 api.value(0) 取出当前 dataItem 中第一个维度的数值。
        const start = api.coord([api.value(1), categoryIndex]) // 这里使用 api.coord(...) 将数值在当前坐标系中转换成为屏幕上的点的像素值。
        const end = api.coord([api.value(2), categoryIndex])
        const height = api.size?.([0, 1])[1] * 10

        return {
          type: 'rect', // 表示这个图形元素是矩形。还可以是 'circle', 'sector', 'polygon' 等等。
          shape: graphic.clipRectByRect(
            {
              // 矩形的位置和大小。
              x: start[0],
              y: start[1] - height / 2,
              width: end[0] - start[0],
              height: height
            },
            {
              // 当前坐标系的包围盒。
              x: params.coordSys.x,
              y: params.coordSys.y,
              width: params.coordSys.width,
              height: params.coordSys.height
            }
          ),
          style: api.style()
        }
      },
      encode: {
        x: [1, 2], // data 中『维度1』和『维度2』对应到 X 轴
        y: 0 // data 中『维度0』对应到 Y 轴
      },
      data: [
        // 维度0 维度1 维度2
        {
          itemStyle: { normal: { color: colors[1] } }, //条形颜色
          name: '焊接机器人',
          value: [1, '2023-01-10 08:00', '2023-01-10 09:00', 0] //0,1,2代表y轴的索引，后两位代表x轴数据开始和结束
        },
        {
          itemStyle: { normal: { color: colors[0] } }, //条形颜色
          name: '焊接机器人',
          value: [0, '2023-01-10 09:00', '2023-01-10 09:10', 0] //0,1,2代表y轴的索引，后两位代表x轴数据开始和结束
        },
        {
          itemStyle: { normal: { color: colors[1] } }, //条形颜色
          name: '焊接机器人',
          value: [1, '2023-01-10 09:10', '2023-01-10 09:20', 0] //0,1,2代表y轴的索引，后两位代表x轴数据开始和结束
        },
        {
          itemStyle: { normal: { color: colors[2] } }, //条形颜色
          name: '焊接机器人',
          value: [2, '2023-01-10 09:20', '2023-01-10 09:30', 0] //0,1,2代表y轴的索引，后两位代表x轴数据开始和结束
        },
        {
          itemStyle: { normal: { color: colors[3] } }, //条形颜色
          name: '焊接机器人',
          value: [3, '2023-01-10 09:30', '2023-01-10 09:50', 0] //0,1,2代表y轴的索引，后两位代表x轴数据开始和结束
        }
      ]
    }
  ]
}
