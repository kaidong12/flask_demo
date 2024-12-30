<template>
  <!-- <div
    ref="myChart"
    id="myChart"
    :style="{ margin: 'auto', width: '100%', height: '800px' }"
  ></div> -->
  <!-- 注意: 如果没有设置width属性(或者设置100%)，居中对齐将不起作用。 -->
  <!-- 注意: 如果没有设置width属性(或者设置100%)，居中对齐将不起作用。 -->
  <!-- 注意: 如果没有设置width属性(或者设置100%)，居中对齐将不起作用。 -->

  <ElRow :gutter="20" justify="space-between">
    <ElCol :span="24">
      <ElCard shadow="hover" class="mb-20px">
        <Echart ref="rebootLogChart" :options="rebootOpt" :height="600" />
      </ElCard>
    </ElCol>
  </ElRow>
</template>

<script setup lang="ts">
import {
  ElRow,
  ElCol,
  ElCard,
  ElSkeleton,
  ElSelect,
  ElOption,
  ElStatistic,
} from "element-plus";
// import { Echart } from "./Echart";
import { rebootOpt } from "./echarts-data";

// // import * as echarts from "echarts";
// import { getCurrentInstance, onMounted } from "vue";

// // 通过 internalInstance.appContext.config.globalProperties 获取全局属性或方法
// let internalInstance = getCurrentInstance();
// let echarts = internalInstance?.appContext.config.globalProperties.$echarts;

// onMounted(() => {
// const dom = document.getElementById("myChart");
// const myChart = echarts.init(dom); // 初始化echarts实例

// // 设置实例参数
// myChart.setOption(rebootOpt);
// });
</script>
