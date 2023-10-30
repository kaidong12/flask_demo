<template>
    <div style="text-align: center;">
        <select v-model="selectedItem">
            <option v-for="item in items" :value="item.id" :key="item.id">{{ item.name }}</option>
        </select>
    </div>
</template>

<script>
import axios from 'axios'

export default {
    name: 'Get_Json_Data1',

    data() {
        return {
            items: [],
            selectedItem: "#1"
        };
    },
    mounted() {
        this.fetchData();
    },
    methods: {
        fetchData() {
            axios.get('/json1').then(res => {
                const s = res.data.results.sites
                console.log(s)
                this.items = s;
                this.selectedItem = s[0].id;
            })
                .catch(error => {
                    console.error('Error fetching data:', error);
                });
        }
    }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style></style>
