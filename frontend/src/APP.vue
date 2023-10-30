<template>
    <el-menu :default-active="activeIndex2" class="el-menu-demo" mode="horizontal" background-color="#545c64"
        text-color="#fff" active-text-color="#ffd04b" @select="handleSelect">
        <el-menu-item index="1">Home</el-menu-item>
        <el-sub-menu index="2">
            <template #title>Workspace</template>
            <el-menu-item index="2-1">Hello World</el-menu-item>
            <el-menu-item index="2-2">Books</el-menu-item>
            <el-menu-item index="2-3">Json Data 1</el-menu-item>
            <el-menu-item index="2-4">Upload File</el-menu-item>
            <el-sub-menu index="2-5">
                <template #title>item four</template>
                <el-menu-item index="2-5-1">item one</el-menu-item>
                <el-menu-item index="2-5-2">item two</el-menu-item>
                <el-menu-item index="2-5-3">item three</el-menu-item>
            </el-sub-menu>
        </el-sub-menu>
        <el-menu-item index="3">Info</el-menu-item>
        <el-menu-item index="4">Orders</el-menu-item>
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
  
<script lang="ts" setup>
import { ref } from 'vue'
import { useRouter } from "vue-router"

const router = useRouter();
const activeIndex = ref('1')
const activeIndex2 = ref('1')
const handleSelect = (key: string, keyPath: string[]) => {
    console.log(key, keyPath[1])
    if (keyPath[0] == "1") {
        router.push({ path: "/" })
        // router.replace({ path: "目标路由位置")
        // router.go()
    }
    else if (keyPath[0] == "2" && keyPath[1] === "2-1") {
        router.push({ path: "/hello" })
    } else if (keyPath[0] == "2" && keyPath[1] === "2-2") {
        router.push({ path: "/books" })
    } else if (keyPath[0] == "2" && keyPath[1] === "2-3") {
        router.push({ path: "/json1" })
    } else if (keyPath[0] == "2" && keyPath[1] === "2-4") {
        router.push({ path: "/upload" })
    }
}

// const handle = () => {
//     //  路径/home对应我在router目录下index.js中定义的path属性值
//     ctx.$router.push('/hello');
// }
</script>
  
<style></style>
  