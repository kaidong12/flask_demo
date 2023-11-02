<template>
    <div id="lightDiv">
        <div v-show="lightOn"></div>
        <img decoding="async" src="https://static.runoob.com/images/svg/img_lightBulb.svg">
    </div>
    <h1>{{ lightOn }}</h1>
    <button v-on:click=" lightOn = !lightOn">开/关</button>
</template>

<script>
export default {
    name: 'Show',
    data() {
        return {
            lightOn: false
        }
    }
}
</script>

<style></style>