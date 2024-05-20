import HelloVue from './components/hello_vue.vue'
import Fold from './components/fold.vue'
import Bind from './components/bind.vue'
import Model from './components/model.vue'
import Show from './components/show.vue'
import If from './components/if.vue'
import For from './components/for.vue'
import Text from './components/text.vue'
import On from './components/on.vue'
import Ref from './components/ref.vue'
import Reactive from './components/reactive.vue'
import Computed1 from './components/computed1.vue'
import Computed2 from './components/computed2.vue'
import Computed3 from './components/computed3.vue'

import Lifecycle from './components/lifecycle.vue'

import HelloWorld from './components/get_data_1.vue'
import JsonData1 from './components/get_data_2.vue'
import Books from './components/Books.vue'

import Home from './components/Home.vue'
import Upload from './components/upload_file.vue'

import Rain from './components/ts/rain.vue'

import Echarts0 from './components/echarts0.vue'
import Echarts1 from './components/echarts1.vue'
import Echarts2 from './components/echarts2.vue'
import Echarts3 from './components/echarts3.vue'
import Echarts4 from './components/echarts4.vue'
import Echarts4_2 from './components/echarts4_2.vue'
import MTBF1 from './components/mtbf1.vue'
import MTBF2 from './components/mtbf2.vue'

import Calendar1 from './components/calendar1.vue'
import Calendar2 from './components/calendar2.vue'
import DatePicker1 from './components/datepicker1.vue'
import DatePicker2 from './components/datepicker2.vue'
import DatePicker3 from './components/datepicker3.vue'

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
    path: '/vtext',
    component: Text,
  },
  {
    path: '/von',
    component: On,
  },
  {
    path: '/ref1',
    component: Ref,
  },
  {
    path: '/reactive',
    component: Reactive,
  },
  {
    path: '/computed1',
    component: Computed1,
  },
  {
    path: '/computed2',
    component: Computed2,
  },
  {
    path: '/computed3',
    component: Computed3,
  },
  {
    path: '/lifecycle',
    component: Lifecycle,
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
    path: '/rain',
    component: Rain,
  },
  {
    path: '/upload',
    name: 'Upload',
    component: Upload,
  },
  {
    path: '/echarts0',
    name: 'echarts0',
    component: Echarts0,
  },
  {
    path: '/echarts1',
    name: 'echarts1',
    component: Echarts1,
  },
  {
    path: '/echarts2',
    name: 'echarts2',
    component: Echarts2,
  },
  {
    path: '/echarts3',
    name: 'echarts3',
    component: Echarts3,
  },
  {
    path: '/echarts4',
    name: 'echarts4',
    component: Echarts4,
  },
  {
    path: '/echarts4_2',
    name: 'echarts4_2',
    component: Echarts4_2,
  },
  {
    path: '/mtbf1',
    name: 'mtbf1',
    component: MTBF1,
  },
  {
    path: '/mtbf2',
    name: 'mtbf2',
    component: MTBF2,
  },
  {
    path: '/calendar1',
    name: 'calendar1',
    component: Calendar1,
  },
  {
    path: '/calendar2',
    name: 'calendar2',
    component: Calendar2,
  },
  {
    path: '/datepicker1',
    name: 'datepicker1',
    component: DatePicker1,
  },
  {
    path: '/datepicker2',
    name: 'datepicker2',
    component: DatePicker2,
  },
  {
    path: '/datepicker3',
    name: 'datepicker3',
    component: DatePicker3,
  }
  
]

const router = VueRouter.createRouter({
  history: VueRouter.createWebHashHistory(),
  routes: routes,
})

export default router
