<template>
    <div>
        <ol>
            <li v-for="(site, index) in sites1">
                {{ index }} - {{ site.text }}
            </li>
        </ol>
    </div>

    <div>
        <ul>
            <template v-for="site in sites1">
                <li>{{ site.text }}</li>
                <li>--------------</li>
            </template>
        </ul>
    </div>

    <div>
        <ul>
            <li v-for="value in object">
                {{ value }}
            </li>
        </ul>
    </div>

    <div>
        <ul>
            <li v-for="(value, key, index) in object">
                {{ index }}. {{ key }} : {{ value }}
            </li>
        </ul>
    </div>

    <div>
        <ul>
            <li v-for="n in 10">
                {{ n }}
            </li>
        </ul>
    </div>

    <div>
        <ul>
            <li v-for="n in evenNumbers">{{ n }}</li>
        </ul>
    </div>

    <div>
        <select @change="changeVal($event)" v-model="selOption">
            <template v-for="(site, index) in sites2" :site="site" :index="index" :key="site.id">
                <!-- 索引为 1 的设为默认值，索引值从0 开始-->
                <option v-if="index == 1" :value="site.name" selected>{{ site.name }}</option>
                <option v-else :value="site.name">{{ site.name }}</option>
            </template>
        </select>
        <div>您选中了:{{ selOption }}</div>
    </div>
</template>

<script>
export default {
    name: 'For',
    data() {
        return {
            selOption: "Runoob",
            sites1: [
                { text: 'Google' },
                { text: 'Runoob' },
                { text: 'Taobao' }
            ],
            sites2: [
                { id: 1, name: "Google" },
                { id: 2, name: "Runoob" },
                { id: 3, name: "Taobao" },
            ],
            object: {
                name: '菜鸟教程',
                url: 'http://www.runoob.com',
                slogan: '学的不仅是技术，更是梦想！'
            }
        }
    },
    methods: {
        changeVal: function (event) {
            this.selOption = event.target.value;
            alert("你选中了" + this.selOption);
        }
    }
}
</script>

<style></style>