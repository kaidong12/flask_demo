<template>
  <div class="hello" style="text-align: center">
    <h1>Get Data from backend via axios</h1>
    <h1>{{ msg }}</h1>
    <button @click="test1()">Get String from backend</button>
    <p>{{ text }}</p>
  </div>
  <div id="runoob" style="text-align: center">
    <select @change="changeVal($event)" v-model="selOption">
      <template
        v-for="(site, index) in sites"
        :site="site"
        :index="index"
        :key="site.id"
      >
        <!-- 索引为 1 的设为默认值，索引值从0 开始-->
        <option v-if="index == 1" :value="site.name" selected>
          {{ site.name }}
        </option>
        <option v-else :value="site.name">{{ site.name }}</option>
      </template>
    </select>
    <div>您选中了:{{ selOption }}</div>
  </div>
</template>

<script>
import axios from "axios";
import { onMounted } from "vue";

export default {
  name: "HelloWorld",
  props: {
    msg: String,
  },
  data() {
    return {
      text: "null",
      selOption: "Runoob",
      sites: [
        { id: 1, name: "Google" },
        { id: 2, name: "Runoob" },
        { id: 3, name: "Taobao" },
      ],
      sites2: {},
    };
  },
  methods: {
    test1() {
      axios
        .get("/string")
        .then((res) => {
          this.text = res.data;
        })
        .catch((err) => {
          this.text = "error" + err;
        });
    },
    test2() {
      axios
        .get("/json1")
        .then((res) => {
          this.sites2 = res;
        })
        .catch((err) => {
          this.sites2 = "error" + err;
        });
    },
    changeVal: function (event) {
      this.selOption = event.target.value;
      alert("你选中了" + this.selOption);
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: inline-block;
  margin: 0 10px;
}

a {
  color: #42b983;
}
</style>
