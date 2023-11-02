<template>
    <div id="app">
        <div>
            <input type="text" v-model="message2">
            <p>{{ message2 }}</p>
        </div>

        <div>
            <button v-on:click="reverseMessage">反转字符串</button>
            <input type="text" v-model="message1">
            <p>{{ message1 }}</p>
        </div>

        <div>
            <input type="checkbox" v-model="use">
            <p>{{ use }}</p>
        </div>
        <br>
    </div>
</template>

<script>
export default {
    name: 'Model',
    data() {
        return {
            message1: 'Runoob!',
            message2: 'Hello Vue!!',
            use: true
        }
    },
    methods: {
        reverseMessage() {
            this.message1 = this.message1
                .split('')
                .reverse()
                .join('')
        }
    }
}
</script>