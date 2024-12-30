<template>
  <div
    ref="myChart"
    id="myChart"
    :style="{ margin: 'auto', width: '100%', height: '800px' }"
  ></div>
  <!-- 注意: 如果没有设置width属性(或者设置100%)，居中对齐将不起作用。 -->
  <!-- 注意: 如果没有设置width属性(或者设置100%)，居中对齐将不起作用。 -->
  <!-- 注意: 如果没有设置width属性(或者设置100%)，居中对齐将不起作用。 -->
  <div>
    <el-button type="primary" @click="reset_chart">Reset</el-button>
  </div>
</template>

<script setup lang="ts">
// import * as echarts from "echarts";
import { getCurrentInstance, onMounted } from "vue";

// 通过 internalInstance.appContext.config.globalProperties 获取全局属性或方法
let internalInstance = getCurrentInstance();
let echarts = internalInstance.appContext.config.globalProperties.$echarts;

var myChart;
var myOption;

function reset_chart() {
  console.log("reset_chart");

  // myChart.dispose();

  myChart.clear();

  // myChart.setOption(myOption, true);
  // var ops = myChart.getOption();
  // console.log(ops);
}

onMounted(() => {
  const dom = document.getElementById("myChart");
  myChart = echarts.init(dom, null, {
    renderer: "canvas",
    useDirtyRect: false,
  });
  var app = {};

  var data = [];
  var dataCount = 100; // 测试数据条数
  var startTime = 1525835791000; // 2018/5/9 11:16:31
  var categories = [
    "大族激光1",
    "大族激光2",
    "大族激光3",
    "大族激光4",
  ].reverse();
  var types = [
    {
      name: "运行",
      color: "green",
    },
    {
      name: "待机",
      color: "yellow",
    },
    {
      name: "停机",
      color: "red",
    },
  ];

  // Generate mock data

  // echarts.util.each(categories, function(category, index) {
  //     var baseTime = startTime;
  //     for (var i = 0; i < dataCount; i++) {
  //         var typeItem = types[Math.round(Math.random() * (types.length - 1))];
  //         var duration = Math.round(Math.random() * 10000);
  //         data.push({
  //             name: typeItem.name,
  //             value: [
  //                 index,
  //                 baseTime,
  //                 baseTime += duration,
  //                 duration
  //             ],
  //             itemStyle: {
  //                 normal: {
  //                     color: typeItem.color
  //                 }
  //             }
  //         });
  //         baseTime += Math.round(Math.random() * 200);
  //     }
  // });

  data = [
    {
      name: "运行",
      value: [0, 1525835791000, 1525835791000 + 600000, 600000],
      itemStyle: { normal: { color: "green" } },
    },
    {
      name: "停机",
      value: [0, 1525836391000, 1525836391000 + 600000, 600000],
      itemStyle: { normal: { color: "red" } },
    },
    {
      name: "运行",
      value: [0, 1525836991000, 1525836991000 + 600000, 600000],
      itemStyle: { normal: { color: "green" } },
    },
    {
      name: "停机",
      value: [0, 1525837591000, 1525837591000 + 600000, 600000],
      itemStyle: { normal: { color: "red" } },
    },

    // value 第一个参数: 设备 index;
    //       第二个参数: 状态的开始时间;
    //       第三个参数: 状态的结束时间;
    //       第四个参数: 状态的持续时间;

    {
      name: "运行",
      value: [1, 1525835791000, 1525835791000 + 600000, 600000],
      itemStyle: { normal: { color: "green" } },
    },
    {
      name: "运行",
      value: [1, 1525836391000, 1525836391000 + 600000, 600000],
      itemStyle: { normal: { color: "green" } },
    },
    {
      name: "停机",
      value: [1, 1525836991000, 1525836991000 + 600000, 600000],
      itemStyle: { normal: { color: "red" } },
    },
    {
      name: "运行",
      value: [1, 1525837591000, 1525837591000 + 600000, 600000],
      itemStyle: { normal: { color: "green" } },
    },
  ];

  function renderItem(params, api) {
    var categoryIndex = api.value(0);
    var start = api.coord([api.value(1), categoryIndex]);
    var end = api.coord([api.value(2), categoryIndex]);
    var height = api.size([0, 1])[1] * 0.6;

    return {
      type: "rect",
      shape: echarts.graphic.clipRectByRect(
        {
          x: start[0],
          y: start[1] - height / 2,
          width: end[0] - start[0],
          height: height,
        },
        {
          x: params.coordSys.x,
          y: params.coordSys.y,
          width: params.coordSys.width,
          height: params.coordSys.height,
        }
      ),
      style: api.style(),
    };
  }

  myOption = {
    tooltip: {
      formatter: function (params) {
        console.log(params);
        return (
          params.marker + params.name + ": " + params.value[3] / 1000 + " s"
        );
      },
    },
    title: {
      text: "设备状态",
      left: "center",
    },
    legend: {
      data: types,
      bottom: 30,
      right: 20,
      selectedMode: false,
    },
    toolbox: {
      orient: "vertical",
      feature: {
        myTool: {
          show: true, // 是否显示
          title: "refresh", // 工具标题
          icon: "m21.897 13.404.008-.057v.002c.024-.178.044-.357.058-.537.024-.302-.189-.811-.749-.811-.391 0-.715.3-.747.69-.018.221-.044.44-.078.656-.645 4.051-4.158 7.153-8.391 7.153-3.037 0-5.704-1.597-7.206-3.995l1.991-.005c.414 0 .75-.336.75-.75s-.336-.75-.75-.75h-4.033c-.414 0-.75.336-.75.75v4.049c0 .414.336.75.75.75s.75-.335.75-.75l.003-2.525c1.765 2.836 4.911 4.726 8.495 4.726 5.042 0 9.217-3.741 9.899-8.596zm-19.774-2.974-.009.056v-.002c-.035.233-.063.469-.082.708-.024.302.189.811.749.811.391 0 .715-.3.747-.69.022-.28.058-.556.107-.827.716-3.968 4.189-6.982 8.362-6.982 3.037 0 5.704 1.597 7.206 3.995l-1.991.005c-.414 0-.75.336-.75.75s.336.75.75.75h4.033c.414 0 .75-.336.75-.75v-4.049c0-.414-.336-.75-.75-.75s-.75.335-.75.75l-.003 2.525c-1.765-2.836-4.911-4.726-8.495-4.726-4.984 0-9.12 3.654-9.874 8.426z",
          onclick: function (echartsInstance) {
            // 获取当前图表的配置选项
            const option = echartsInstance.getOption();
            console.log("当前图表配置:", option);
            const zoom = option.dataZoom[0];
            var dataZoom1 = [
              {
                type: "slider",
                filterMode: "weakFilter",
                showDataShadow: false,
                top: 400,
                height: 10,
                start: 0,
                end: 100,
                borderColor: "transparent",
                backgroundColor: "#e2e2e2",
                handleIcon:
                  "M10.7,11.9H9.3c-4.9,0.3-8.8,4.4-8.8,9.4c0,5,3.9,9.1,8.8,9.4h1.3c4.9-0.3,8.8-4.4,8.8-9.4C19.5,16.3,15.6,12.2,10.7,11.9z M13.3,24.4H6.7v-1.2h6.6z M13.3,22H6.7v-1.2h6.6z M13.3,19.6H6.7v-1.2h6.6z", // jshint ignore:line
                handleSize: 20,
                handleStyle: {
                  shadowBlur: 6,
                  shadowOffsetX: 1,
                  shadowOffsetY: 2,
                  shadowColor: "#aaa",
                },
                labelFormatter: "",
              },
              {
                type: "inside",
                filterMode: "weakFilter",
              },
            ];
            console.log("zoom:", dataZoom1);
            option.dataZoom[0] = dataZoom1;
            echartsInstance.setOption(option);
          },
          iconStyle: {
            // borderColor: '#fff',
            // borderWidth: 2
          },
          emphasis: {
            iconStyle: {},
          },
        },
      },
    },
    dataZoom: [
      {
        type: "slider",
        filterMode: "weakFilter",
        showDataShadow: false,
        top: 400,
        height: 10,
        start: 0,
        end: 100,
        borderColor: "transparent",
        backgroundColor: "#e2e2e2",
        handleIcon:
          "M10.7,11.9H9.3c-4.9,0.3-8.8,4.4-8.8,9.4c0,5,3.9,9.1,8.8,9.4h1.3c4.9-0.3,8.8-4.4,8.8-9.4C19.5,16.3,15.6,12.2,10.7,11.9z M13.3,24.4H6.7v-1.2h6.6z M13.3,22H6.7v-1.2h6.6z M13.3,19.6H6.7v-1.2h6.6z", // jshint ignore:line
        handleSize: 20,
        handleStyle: {
          shadowBlur: 6,
          shadowOffsetX: 1,
          shadowOffsetY: 2,
          shadowColor: "#aaa",
        },
        labelFormatter: "",
      },
      {
        type: "inside",
        filterMode: "weakFilter",
      },
    ],
    grid: {
      height: 300,
    },
    xAxis: {
      type: "time",
      min: startTime,
      scale: true,
      // axisLabel: {
      //     formatter: function(val) {
      //         return Math.max(0, val - startTime);
      //     }
      // }
    },
    yAxis: {
      data: categories,
    },
    series: [
      { name: types[0].name, type: "bar", data: [], color: "red" },
      { name: types[1].name, type: "bar", data: [], color: "green" },
      { name: types[2].name, type: "bar", data: [], color: "yellow" },
      {
        type: "custom",
        renderItem: renderItem,
        itemStyle: {
          normal: {
            opacity: 0.8,
          },
        },
        encode: {
          x: [1, 2, 3],
          y: 0,
        },
        data: data,
      },
    ],
  };

  // 设置实例参数
  myChart.setOption(myOption);
});
</script>
