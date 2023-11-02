import HelloVue from './components/hello_vue.vue'
import Fold from './components/fold.vue'
import Bind from './components/bind.vue'
import Model from './components/model.vue'
import Show from './components/show.vue'
import If from './components/if.vue'
import For from './components/for.vue'

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
    path: '/fold',
    name: 'Fold',
    component: Fold,
  },
  {
    path: '/vbind',
    name: 'Bind',
    component: Bind,
  },
  {
    path: '/vshow',
    name: 'Show',
    component: Show,
  },
  {
    path: '/vif',
    name: 'If',
    component: If,
  },
  {
    path: '/vfor',
    name: 'For',
    component: For,
  },
  {
    path: '/vmodel',
    name: 'Model',
    component: Model,
  },
  {
    path: '/hellovue',
    name: 'HelloVue',
    component: HelloVue,
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
