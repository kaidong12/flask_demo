<template>
    <div @click="parent">
        <button @click="child"> 尽情的点击我 </button>
    </div>
    <div @click="parent">
        <button @[event].once="child"> 尽情的点击我-once </button>
    </div>
    <div @click="parent">
        <button @[event].stop="child"> 尽情的点击我-stop </button>
    </div>
    <div @click="parent">
        <button @[event].prevent="child"> 尽情的点击我-prevent </button>
    </div>
</template>

<script setup lang="ts">
const event = "click"
const parent = () => {
    console.log("this is parent!")
}

const child = () => {
    console.log("this is Child!")
}

</script>


<style></style>4