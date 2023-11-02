<template>
    <div id="hello-vue" class="demo">
        {{ message }}
    </div>
</template>

<script>
export default {
    name: 'HelloVue',
    props: {
        msg: String
    },
    data() {
        return {
            message: 'Hello Vue!!'
        }
    }
}

</script>

<style>
div {
    text-align: center;
}
</style>