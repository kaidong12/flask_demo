<template>
    <div v-text="a">

    </div>

    <div v-html="b">

    </div>
</template>

<script setup lang="ts">
const a: string = "this is a string"
const b: string = "<h1> this is a header</h1>"
import { ref, onBeforeMount, onMounted, onBeforeUnmount, onUnmounted } from 'vue'

//创建
onBeforeMount(() => {
    console.log('Text 创建之前')
})

onMounted(() => {
    console.log('Text 创建完成')
})

//销毁
onBeforeUnmount(() => {
    console.log('Text 销毁之前')
})

onUnmounted(() => {
    console.log('Text 销毁完成')
})


</script>


<style></style>