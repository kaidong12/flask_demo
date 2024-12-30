import Home from './components/Home.vue'

import HelloVue from './components/runoob/hello_vue.vue'
import Bind from './components/runoob/bind.vue'
import Model from './components/runoob/model.vue'
import Show from './components/runoob/show.vue'
import If from './components/runoob/if.vue'
import For from './components/runoob/for.vue'
import Text from './components/runoob/text.vue'
import On from './components/runoob/on.vue'
import Ref from './components/runoob/ref.vue'
import Lifecycle from './components/runoob/lifecycle.vue'
import Reactive from './components/runoob/reactive.vue'
import Computed1 from './components/runoob/computed1.vue'
import Computed2 from './components/runoob/computed2.vue'
import Computed3 from './components/runoob/computed3.vue'

import HelloWorld from './components/examples/get_data_1.vue'
import JsonData1 from './components/examples/get_data_2.vue'

import Books from './components/examples/Books.vue'
import Fold from './components/examples/fold.vue'

import Upload1 from './components/examples/upload_file_1.vue'
import Upload2 from './components/examples/upload_file_2.vue'
import Uploadm1 from './components/examples/upload_file_m1.vue'
import Uploadm2 from './components/examples/upload_file_m2.vue'

import Tree1 from './components/examples/tree1_filter.vue'
import Tree2 from './components/examples/tree2_checkbox.vue'
import Tree3 from './components/examples/tree3_draggable.vue'

import Echarts0 from './components/examples/echarts0.vue'
import Echarts1 from './components/examples/echarts1.vue'
import Echarts2 from './components/examples/echarts2.vue'
import Echarts3 from './components/examples/echarts3.vue'
import Echarts4 from './components/examples/echarts4.vue'
import Echarts4_2 from './components/examples/echarts4_2.vue'
import MTBF1 from './components/examples/mtbf1.vue'
import MTBF2 from './components/examples/mtbf2.vue'

import Validator from './components/examples/form_validator.vue'

import Calendar1 from './components/runoob/calendar1.vue'
import Calendar2 from './components/runoob/calendar2.vue'
import DatePicker1 from './components/runoob/datepicker1.vue'
import DatePicker2 from './components/runoob/datepicker2.vue'
import DatePicker3 from './components/runoob/datepicker3.vue'

import Table1 from './components/examples/table_1.vue'
import Table2 from './components/examples/table_2.vue'
import Table3 from './components/examples/table_3.vue'

import Rain from './components/ts/rain.vue'
import SetTimerInterval from './components/ts/setInterval.vue'
import SetTimeout from './components/ts/setTimeout.vue'

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
    path: '/refref1',
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
    path: '/upload1',
    name: 'Upload1',
    component: Upload1,
  },
  {
    path: '/upload2',
    name: 'Upload2',
    component: Upload2,
  },
  {
    path: '/uploadm1',
    name: 'Uploadm1',
    component: Uploadm1,
  },
  {
    path: '/uploadm2',
    name: 'Uploadm2',
    component: Uploadm2,
  },
  {
    path: '/tree1',
    name: 'Tree1',
    component: Tree1,
  },
  {
    path: '/tree2',
    name: 'Tree2',
    component: Tree2,
  },
  {
    path: '/tree3',
    name: 'Tree3',
    component: Tree3,
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
  },
  {
    path: '/setTimerInterval',
    component: SetTimerInterval,
  },
  {
    path: '/setTimeout',
    component: SetTimeout,
  },
  {
    path: '/table1',
    name: 'Table1',
    component: Table1,
  },
  {
    path: '/table2',
    name: 'Table2',
    component: Table2,
  },
  {
    path: '/table3',
    name: 'Table3',
    component: Table3,
  },
  {
    path: '/validator',
    name: 'Validator',
    component: Validator,
  },
  
]

const router = VueRouter.createRouter({
  history: VueRouter.createWebHashHistory(),
  routes: routes,
})

export default router
