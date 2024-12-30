<template>
    <div>
        <h1>life cycle demo</h1>
    </div>
    <div ref="div">
        {{ a }}
    </div>
    <button @click="change">修改</button>

    <Text v-if="flag">
    </Text>
    <button @click="flag = !flag">创建/销毁</button>
</template>

<script setup lang="ts">
import { ref, onBeforeMount, onMounted, onBeforeUpdate, onUpdated, onBeforeUnmount, onUnmounted, onRenderTracked, onRenderTriggered } from 'vue'

import Text from './text.vue'

console.log('setup执行了')
const a = ref<string>("小满")
const div = ref<HTMLElement>()
const flag = ref<boolean>(true)
const change = () => {
    a.value = '变成大满了'
}

defineExpose({
    change
})

//创建
onBeforeMount(() => {
    console.log('创建之前', div.value)
})

onMounted(() => {
    console.log('创建完成', div.value)
})

//更新
onBeforeUpdate(() => {
    console.log('更新之前', div.value?.innerText)
})

onUpdated(() => {
    console.log('更新完成', div.value?.innerText)
})

//销毁
onBeforeUnmount(() => {
    console.log('销毁之前')
})

onUnmounted(() => {
    console.log('销毁完成')
})

</script>


<style></style>