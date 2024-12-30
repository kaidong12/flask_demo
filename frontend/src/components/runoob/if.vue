<template>
    <div id="app">
        <p>{{ score }}</p>
        <div v-if="score > 90">
            A
        </div>
        <div v-else-if="score > 80">
            B
        </div>
        <div v-else-if="score > 60">
            C
        </div>
        <div v-else>
            D
        </div>
        <input type="text" v-model="score">
        <button v-on:click="get_score">再试一次</button>
    </div>
</template>

<script>
export default {
    name: 'If',
    data() {
        return {
            score: 100
        }
    },
    methods: {
        get_score() {
            this.score = Math.random() * 100
        }
    }
}
</script>

<style></style>