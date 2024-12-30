<template>
    <div>

        <div>
            姓： <input type="text" v-model="firstName">
        </div>
        <div>
            名： <input type="text" v-model="lastName">
        </div>
        <div>
            全名：{{ fullName }}
        </div>
        <button @click="change">Change Name</button>
    </div>
</template>
 
<script setup lang="ts">
import { ref, computed } from 'vue'
let firstName = ref("张")
let lastName = ref("三")
// 1， 选项式写法, 支持传入一个对象，在对象中通过get, set函数自定义操作
let fullName = computed<string>({
    get() {
        return firstName.value + '-' + lastName.value
    },
    set(newName) {
        [firstName.value, lastName.value] = newName.split('-')
    }
})

const change = () => {
    // firstName.value = "李"
    // lastName.value = "四"
    fullName.value = "李-四"
}

// 2， 函数式写法, 但是只支持读取，不支持修改
// let fullName = computed(() => {
//     return firstName.value + '-' + lastName.value
// })


</script>
 
 
<style></style>