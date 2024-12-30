<template>
  <el-menu
    :default-active="activeIndex2"
    class="el-menu-demo"
    mode="horizontal"
    background-color="#545c64"
    text-color="#fff"
    active-text-color="#ffd04b"
    @select="handleSelect"
  >
    <el-menu-item index="1">Home</el-menu-item>
    <el-sub-menu index="2">
      <template #title>Runoob</template>
      <el-sub-menu index="2-1">
        <template #title>Basic</template>
        <el-menu-item index="2-1-1">Hello Vue</el-menu-item>
        <el-menu-item index="2-1-2">v-bind</el-menu-item>
        <el-menu-item index="2-1-3">v-model</el-menu-item>
        <el-menu-item index="2-1-4">v-show</el-menu-item>
        <el-menu-item index="2-1-5">v-if</el-menu-item>
        <el-menu-item index="2-1-6">v-for</el-menu-item>
        <el-menu-item index="2-1-7">v-text</el-menu-item>
        <el-menu-item index="2-1-8">v-on</el-menu-item>
        <el-menu-item index="2-1-9">ref</el-menu-item>
        <el-menu-item index="2-1-13">Reactive</el-menu-item>
        <el-menu-item index="2-1-10">Computed1</el-menu-item>
        <el-menu-item index="2-1-11">Computed2</el-menu-item>
        <el-menu-item index="2-1-12">Computed3</el-menu-item>
      </el-sub-menu>
      <el-sub-menu index="2-2">
        <template #title>Medium</template>
        <el-menu-item index="2-2-1">life cycle</el-menu-item>
        <el-menu-item index="2-2-2">item two</el-menu-item>
        <el-menu-item index="2-2-3">item three</el-menu-item>
      </el-sub-menu>
      <el-sub-menu index="2-3">
        <template #title>Advanced</template>
        <el-menu-item index="2-3-1">Calendar1</el-menu-item>
        <el-menu-item index="2-3-2">Calendar2</el-menu-item>
        <el-menu-item index="2-3-3">Date Picker 1</el-menu-item>
        <el-menu-item index="2-3-4">Date Picker 2</el-menu-item>
        <el-menu-item index="2-3-5">Date Picker 3</el-menu-item>
      </el-sub-menu>
    </el-sub-menu>
    <el-sub-menu index="3">
      <template #title>Example</template>
      <el-menu-item index="3-1">Hello World</el-menu-item>
      <el-menu-item index="3-2">Fold</el-menu-item>
      <el-menu-item index="3-3">Books</el-menu-item>
      <el-menu-item index="3-4">Json Data 1</el-menu-item>
      <el-sub-menu index="3-5">
        <template #title>Echarts</template>
        <el-menu-item index="3-5-5">Echarts-line</el-menu-item>
        <el-menu-item index="3-5-1">Echarts-status</el-menu-item>
        <el-menu-item index="3-5-2">Echarts-status2</el-menu-item>
        <el-menu-item index="3-5-3">Echarts-pie</el-menu-item>
        <el-menu-item index="3-5-4">Echarts-profile</el-menu-item>
        <el-menu-item index="3-5-8">Echarts-profile-2</el-menu-item>
        <el-menu-item index="3-5-6">Echarts-MTBF1</el-menu-item>
        <el-menu-item index="3-5-7">Echarts-MTBF2</el-menu-item>
      </el-sub-menu>
      <el-sub-menu index="3-6">
        <template #title>Upload File</template>
        <el-menu-item index="3-6-1">Upload One File 1</el-menu-item>
        <el-menu-item index="3-6-2">Upload One File 2</el-menu-item>
        <el-menu-item index="3-6-3">Upload Multiple File 1</el-menu-item>
        <el-menu-item index="3-6-4">Upload Multiple File 2</el-menu-item>
      </el-sub-menu>
      <el-menu-item index="3-7">Rain</el-menu-item>
      <el-sub-menu index="3-8">
        <template #title>Tree</template>
        <el-menu-item index="3-8-1">Tree1-Filter</el-menu-item>
        <el-menu-item index="3-8-2">Tree2-Checkbox</el-menu-item>
        <el-menu-item index="3-8-3">Tree3-Draggable</el-menu-item>
      </el-sub-menu>
      <el-sub-menu index="3-9">
        <template #title>Table</template>
        <el-menu-item index="3-9-1">Table1-v1</el-menu-item>
        <el-menu-item index="3-9-2">Table2-v2</el-menu-item>
        <el-menu-item index="3-9-3">Table3-v1</el-menu-item>
      </el-sub-menu>
      <el-menu-item index="3-10">Validator</el-menu-item>
    </el-sub-menu>
    <el-sub-menu index="4">
      <template #title>Java Script</template>
      <el-menu-item index="4-1">Hello World</el-menu-item>
      <el-sub-menu index="4-2">
        <template #title>Timer</template>
        <el-menu-item index="4-2-1">setTimeout</el-menu-item>
        <el-menu-item index="4-2-2">setInterval</el-menu-item>
      </el-sub-menu>
      <el-sub-menu index="4-3">
        <template #title>Upload File</template>
        <el-menu-item index="4-3-1">Upload One File 1</el-menu-item>
      </el-sub-menu>
      <el-menu-item index="4-4">Rain</el-menu-item>
    </el-sub-menu>
    <el-menu-item index="5">Help</el-menu-item>
  </el-menu>

  <div id="app">
    <top></top>
    <!-- 路由出口 -->
    <!-- 路由匹配到的组件将渲染在这里 -->
    <router-view></router-view>

    <!-- <button @click="handle">点击跳转</button> -->
    <!-- <hello></hello> -->
    <!-- <HelloWorld msg="Vite + Vue" /> -->
    <bottom></bottom>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();
const activeIndex = ref("1");
const activeIndex2 = ref("1");
const handleSelect = (key: string, keyPath: string[]) => {
  console.log(key, keyPath[0], keyPath[1]);
  if (keyPath[0] == "1") {
    router.push({ path: "/" });
    // router.replace({ path: "目标路由位置")
    // router.go()
  } else if (key == "2-1-1") {
    router.push({ path: "/hellovue" });
  } else if (key == "2-1-2") {
    router.push({ path: "/vbind" });
  } else if (key == "2-1-3") {
    router.push({ path: "/vmodel" });
  } else if (key == "2-1-4") {
    router.push({ path: "/vshow" });
  } else if (key == "2-1-5") {
    router.push({ path: "/vif" });
  } else if (key == "2-1-6") {
    router.push({ path: "/vfor" });
  } else if (key == "2-1-7") {
    router.push({ path: "/vtext" });
  } else if (key == "2-1-8") {
    router.push({ path: "/von" });
  } else if (key == "2-1-9") {
    router.push({ path: "/ref1" });
  } else if (key == "2-1-10") {
    router.push({ path: "/computed1" });
  } else if (key == "2-1-11") {
    router.push({ path: "/computed2" });
  } else if (key == "2-1-12") {
    router.push({ path: "/computed3" });
  } else if (key == "2-1-13") {
    router.push({ path: "/reactive" });
  } else if (key == "2-2-1") {
    router.push({ path: "/lifecycle" });
  } else if (key == "2-3-1") {
    router.push({ path: "/calendar1" });
  } else if (key == "2-3-2") {
    router.push({ path: "/calendar2" });
  } else if (key == "2-3-3") {
    router.push({ path: "/datepicker1" });
  } else if (key == "2-3-4") {
    router.push({ path: "/datepicker2" });
  } else if (key == "2-3-5") {
    router.push({ path: "/datepicker3" });
  }

  if (key == "3-1") {
    router.push({ path: "/hello" });
  } else if (key == "3-2") {
    router.push({ path: "/fold" });
  } else if (key == "3-3") {
    router.push({ path: "/books" });
  } else if (key == "3-4") {
    router.push({ path: "/json1" });
  } else if (key == "3-5-1") {
    router.push({ path: "/echarts1" });
  } else if (key == "3-5-2") {
    router.push({ path: "/echarts2" });
  } else if (key == "3-5-3") {
    router.push({ path: "/echarts3" });
  } else if (key == "3-5-4") {
    router.push({ path: "/echarts4" });
  } else if (key == "3-5-8") {
    router.push({ path: "/echarts4_2" });
  } else if (key == "3-5-5") {
    router.push({ path: "/echarts0" });
  } else if (key == "3-5-6") {
    router.push({ path: "/mtbf1" });
  } else if (key == "3-5-7") {
    router.push({ path: "/mtbf2" });
  } else if (key == "3-6-1") {
    router.push({ path: "/upload1" });
  } else if (key == "3-6-2") {
    router.push({ path: "/upload2" });
  } else if (key == "3-6-3") {
    router.push({ path: "/uploadm1" });
  } else if (key == "3-6-4") {
    router.push({ path: "/uploadm2" });
  } else if (key == "3-7") {
    router.push({ path: "/rain" });
  } else if (key == "3-8-1") {
    router.push({ path: "/tree1" });
  } else if (key == "3-8-2") {
    router.push({ path: "/tree2" });
  } else if (key == "3-8-3") {
    router.push({ path: "/tree3" });
  } else if (key == "3-9-1") {
    router.push({ path: "/table1" });
  } else if (key == "3-9-2") {
    router.push({ path: "/table2" });
  } else if (key == "3-9-3") {
    router.push({ path: "/table3" });
  } else if (key == "3-10") {
    router.push({ path: "/validator" });
  }

  if (key == "4-1") {
    router.push({ path: "/hello" });
  } else if (key == "4-2-1") {
    router.push({ path: "/setTimeout" });
  } else if (key == "4-2-2") {
    router.push({ path: "/setTimerInterval" });
  }
};

// const handle = () => {
//     //  路径/home对应我在router目录下index.js中定义的path属性值
//     ctx.$router.push('/hello');
// }
</script>

<style></style>
