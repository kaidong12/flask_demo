import { createApp } from 'vue'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import router from './router'
import axios from 'axios'


import App from './App.vue'
import Bottom from './components/Bottom.vue'
import Top from './components/Top.vue'


// 设置全局变量
axios.defaults.baseURL = 'http://localhost:5000';
// axios.defaults.headers.common['Authorization'] = AUTH_TOKEN;
// axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';

const app = createApp(App)
app.component('top', Top)
app.component('bottom', Bottom)
app.use(ElementPlus)
app.use(router)
app.mount('#app')
