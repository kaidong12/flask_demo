<template>
  <div
    ref="myChart"
    id="myChart"
    :style="{ margin: 'auto', width: '100%', height: '800px' }"
  ></div>
  <!-- 注意: 如果没有设置width属性(或者设置100%)，居中对齐将不起作用。 -->
  <!-- 注意: 如果没有设置width属性(或者设置100%)，居中对齐将不起作用。 -->
  <!-- 注意: 如果没有设置width属性(或者设置100%)，居中对齐将不起作用。 -->
</template>

<script setup lang="ts">
import * as echarts from "echarts";
import { getCurrentInstance, onMounted } from "vue";

// // 通过 internalInstance.appContext.config.globalProperties 获取全局属性或方法
// let internalInstance = getCurrentInstance();
// let echarts = internalInstance.appContext.config.globalProperties.$echarts;

// onMounted(() => {
//   const dom = document.getElementById("myChart");
//   const myChart = echarts.init(dom); // 初始化echarts实例
//   const option = {
//     xAxis: {
//       type: "category",
//       data: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
//     },
//     yAxis: {
//       type: "value",
//     },
//     series: [
//       {
//         data: [820, 932, 901, 934, 1290, 1330, 1320],
//         type: "line",
//         smooth: true,
//       },
//     ],
//   };
// });
onMounted(() => {
  var dom = document.getElementById("myChart");
  var myChart = echarts.init(dom, null, {
    renderer: "canvas",
    useDirtyRect: false,
  });

  var data = [];
  var dataCount = 10;
  var startTime = +new Date();
  var categories = ["categoryA", "categoryB", "categoryC"];
  var types = [
    { name: "JS Heap", color: "#7b9ce1" },
    { name: "Documents", color: "#bd6d6c" },
    { name: "Nodes", color: "#75d874" },
    { name: "Listeners", color: "#e0bc78" },
    { name: "GPU Memory", color: "#dc77dc" },
    { name: "GPU", color: "#72b362" },
  ];
  // Generate mock data
  categories.forEach(function (category, index) {
    var baseTime = startTime;
    for (var i = 0; i < dataCount; i++) {
      var typeItem = types[Math.round(Math.random() * (types.length - 1))];
      var duration = Math.round(Math.random() * 10000);
      data.push({
        name: typeItem.name,
        value: [index, baseTime, (baseTime += duration), duration],
        itemStyle: {
          normal: {
            color: typeItem.color,
          },
        },
      });
      baseTime += Math.round(Math.random() * 2000);
    }
  });
  function renderItem(params, api) {
    var categoryIndex = api.value(0);
    var start = api.coord([api.value(1), categoryIndex]);
    var end = api.coord([api.value(2), categoryIndex]);
    var height = api.size([0, 1])[1] * 0.6;
    var rectShape = echarts.graphic.clipRectByRect(
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
    );
    return (
      rectShape && {
        type: "rect",
        transition: ["shape"],
        shape: rectShape,
        style: api.style(),
      }
    );
  }
  var option = {
    tooltip: {
      formatter: function (params) {
        return params.marker + params.name + ": " + params.value[3] + " ms";
      },
    },
    title: {
      text: "Profile",
      left: "center",
    },
    dataZoom: [
      {
        type: "slider",
        filterMode: "weakFilter",
        showDataShadow: false,
        top: 400,
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
      min: startTime,
      scale: true,
      axisLabel: {
        formatter: function (val) {
          return Math.max(0, val - startTime) + " ms";
        },
      },
    },
    yAxis: {
      data: categories,
    },
    series: [
      {
        type: "custom",
        renderItem: renderItem,
        itemStyle: {
          opacity: 0.8,
        },
        encode: {
          x: [1, 2],
          y: 0,
        },
        data: data,
      },
    ],
  };
  if (option && typeof option === "object") {
    myChart.setOption(option);
  }
});
</script>
