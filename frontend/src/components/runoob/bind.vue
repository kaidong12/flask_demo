<template>
    <div id="app">
        <p>{{ use }}</p>
        <label for="r1">修改颜色</label> <input type="checkbox" v-model="use" id="r1">
        <br><br>

        <div v-bind:class="{ 'class1': use }">
            v-bind:class 指令 demo (原始形态)
        </div>

        <div class='class3' :class="[use ? 'class1' : 'class2']">
            :class 指令 demo (静态+动态)
        </div>

        <div :style="style">
            v-bind:class 指令 demo (style)
        </div>
    </div>
</template>

<script>
export default {
    name: 'Bind',
    data() {
        return {
            use: false,
            style: {
                color: 'red',
                fontSize: '20px',
                border: '1px solid red'
            }
        }
    }
}
</script>

<style>
.class1 {
    background: #444;
    color: #eee;
}

.class2 {
    border: '1px solid red';
    color: blue;
}

.class3 {
    background: #aeaa;
}
</style>