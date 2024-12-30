<template>
    <div id="hello-vue" class="demo">
        {{ message }}
        <br>
        {{ a.map(v => ({ num: v })) }}
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
            message: 'Hello Vue!!',
            a: [1, 2, 3, 4, 5]
        }
    }
}

</script>

<style>
div {
    text-align: center;
}
</style>