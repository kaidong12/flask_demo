<template>
    <div>
        <form>
            <input type="text" v-model="form.name" />
            <br>
            <input type="text" v-model="form.age" />
            <br>
            <button @click.prevent="submit">提交</button>
        </form>
    </div>
    <div>
        <ul>
            <li v-for="item in arr">{{ item }}</li>
        </ul>
        <button @click.prevent="add">添加</button>
    </div>
    <div>
        <ul>
            <li v-for="item in list2.arr2">{{ item }}</li>
        </ul>
        <button @click.prevent="add2">添加2</button>
    </div>
</template>
 
<script setup lang="ts">
    import { ref, reactive, readonly, ShallowReactive } from 'vue'
    // ref 和 reactive 的区别
    // ref 用来定义一个响应式的数据，reactive 用来定义一个响应式的对象
    // 1. ref 支持所有类型的数据，reactive 只支持对象类型的数据 Array, Object, Map, Set
    // 2. ref 取值 赋值 都需要加 .value， reactive 不需要加 .value
    // 3. reactive proxy 不能直接赋值，否则会破坏响应式对象的
    // 解决办法1： 数组 可以使用push加解构
    // 解决办法2： 添加一个对象，把数组作为属性

    // 对象
    let form = reactive({
        name: "小满",
        age: 18
    })

    form.age = 33

    // 数组
    let arr = reactive([1, 2, 3, 4, 5])

    // 对象
    let list2 = reactive<{ arr2: string[] }>(
        {
            arr2: []
        }
    )

    const submit = () => {
        console.log(form);
    }

    // const add = () => {
    //     arr.push(6)
    // }
    const add = () => {
        setTimeout(() => {
            let res = [1, 2, 3]
            // arr = res;
            //解决办法1： 数组 可以使用push加解构
            arr.push(...res);
            console.log(arr);
        }, 1000)
    }

    const add2 = () => {
        setTimeout(() => {
            let res = ["abc", "def", "sfa"]
            //解决办法2： 对象
            list2.arr2 = res;
            console.log(list2);
        }, 1000)
    }

</script>

<style></style>