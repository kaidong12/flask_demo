<template>
    <div>
        <button @click="changeMsg">change0</button>
        <div>ref方法: {{ m }}</div>
    </div>
    <div>
        <button @click="changeMsg">change00</button>
        <div>Ref interface: {{ m2 }}</div>
    </div>

    <div>
        <button @click="changeMsg">change1</button>
        <div>{{ notRef }}</div>
    </div>
    <div>
        <button @click="changeMsg">change2</button>
        <div>{{ message }}</div>
    </div>
    <div>
        <button @click="changeMsg">change3</button>
        <div>{{ message2 }}</div>
    </div>

    <div>
        <button @click="changeMsg">change4</button>
        <div>{{ message3 }}</div>
    </div>
</template>
 
<script setup lang="ts">
import { ref, Ref, isRef, shallowRef, triggerRef } from 'vue'

type Man = {
    name: string
    age: number
}

const m = ref<Man>({ name: "小满", age: 18 })
const m2: Ref<Man> = ref({ name: "小满", age: 18 })

let message: Ref<string | number> = ref("我是message")
let notRef: number = 1

type Obj = {
    name: string
}
let message2: Ref<Obj> = shallowRef({
    name: "小满"
})

// 浅层引用
let message3 = shallowRef({
    name: "小满"
})


const changeMsg = () => {
    m.value.name = "小满2";
    m.value.age = 28;

    m2.value.name = "小满22";
    m2.value.age = 228;

    notRef += 1
    message.value = "changed msg " + notRef
    console.log(message);
    console.log(isRef(message)); //true
    console.log(isRef(notRef)); //false

    message2.value.name = '大满'
    message3.value = { name: "大满" }
    // triggerRef(message2)

}
</script>
 
 
<style></style>