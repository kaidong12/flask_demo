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
// import * as echarts from "echarts";
import { getCurrentInstance, onMounted } from "vue";

// 通过 internalInstance.appContext.config.globalProperties 获取全局属性或方法
let internalInstance = getCurrentInstance();
let echarts = internalInstance.appContext.config.globalProperties.$echarts;

onMounted(() => {
  const dom = document.getElementById("myChart");
  myChart = echarts.init(dom); // 初始化echarts实例
  const option = {
    title: {
      text: "ECharts 入门示例",
    },
    tooltip: {},
    legend: {
      data: ["销量", "库存"],
    },
    // 设置x轴和y轴
    xAxis: {
      type: "category",
      data: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
    },
    yAxis: {
      type: "value",
    },
    series: [
      {
        name: "销量",
        data: [820, 932, 901, 934, 1290, 1330, 1320],
        type: "line",
        smooth: true,
      },
      {
        name: "库存",
        data: [820, 932, 901, 934, 1290, 1330, 1320],
        type: "bar",
        smooth: true,
        barWidth: 50,
      },
    ],
  };

  // 设置实例参数
  myChart.setOption(option);
});
</script>
