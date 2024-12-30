<template>
    <div align="center">
        <div align="center">
            <input type="text" placeholder="搜索" v-model="keyword">
        </div>
        <div align="center">
            <table border width="600" cellpadding="0" align="center">
                <thead>
                    <tr>
                        <th>商品名称</th>
                        <th>商品价格</th>
                        <th>商品数量</th>
                        <th>商品总价</th>
                        <th>操作</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="(item, index) in searchData">
                        <td align="center">{{ item.name }} </td>
                        <td align="center">{{ item.price }} </td>
                        <td align="center"><button @click="item.count > 1 ? item.count-- : null">-</button>{{
                            item.count
                        }} <button @click="item.count < 99 ? item.count++ : null">+</button></td>
                        <td align="center">{{ item.price * item.count }} </td>
                        <td align="center"> <button @click="del(index)">删除</button> </td>
                    </tr>
                </tbody>
                <tfoot>
                    <tr>
                        <td colspan="5" align="right">总计: {{ total }}</td>
                    </tr>
                </tfoot>
            </table>
        </div>
    </div>
</template>
 
<script setup lang="ts">
import { ref, reactive, computed } from 'vue'
// let $total = ref<number>(0)
let keyword = ref<string>('')
interface Data {
    name: string
    price: number
    count: number
}
const data = reactive<Data[]>([
    {
        name: '商品1',
        price: 100,
        count: 98,
    },
    {
        name: '商品2',
        price: 200,
        count: 1,
    },
    {
        name: '商品3',
        price: 400,
        count: 1,
    },
    {
        name: '商品4',
        price: 800,
        count: 1,
    }
])

// const total = () => {
//     $total.value = data.reduce((pre: number, next: Data) => {
//         return pre + next.price * next.count
//     }, 0)
// }
// total()

const total = computed(() => {
    return data.reduce((pre: number, next: Data) => {
        return pre + next.price * next.count
    }, 0)
})

const del = (index: number) => {
    data.splice(index, 1)
    // total()
}

const searchData = computed(() => {
    return data.filter((item: Data) => {
        return item.name.includes(keyword.value)
    })
})

</script>
 
 
<style></style>