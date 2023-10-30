
import HelloWorld from './components/get_data_1.vue'
import JsonData1 from './components/get_data_2.vue'
import Books from './components/Books.vue'
import Home from './components/Home.vue'
import Upload from './components/upload_file.vue'
import * as VueRouter from 'vue-router'

const routes = [
  {
    path: '/',
    name: 'home',
    component: Home,
  },
  {
    path: '/hello',
    name: 'HelloWorld',
    component: HelloWorld,
  },
  {
    path: '/json1',
    name: 'JsonData1',
    component: JsonData1,
  },
  {
    path: '/books',
    name: 'Books',
    component: Books,
  },
  {
    path: '/upload',
    name: 'Upload',
    component: Upload,
  }
]

const router = VueRouter.createRouter({
  history: VueRouter.createWebHashHistory(),
  routes: routes,
})

export default router
