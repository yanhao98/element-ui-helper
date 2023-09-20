import ElementUI from 'element-ui'
import { setGlobalConfig } from 'element-ui-helper'
import 'element-ui/lib/theme-chalk/index.css'
import Vue from 'vue'
import App from './App.vue'

setupElementUiHelper()
Vue.use(ElementUI)
new Vue(App).$mount('#app')

// #############################
function setupElementUiHelper() {
  setGlobalConfig({
    button: {
      plain: true,
    },
    confirm: {
      round: true,
    },
    hooks: {
      usePaginationElement: {
        defaultParams: {
          pageNum: 2,
          pageSize: 50,
        },
        pagination: {
          currentKey: 'pageNum',
          pageSizeKey: 'pageSize',
          totalKey: 'totalll',
        },
        elPaginationAttrs: {
          // style: 'text-align: right',
          // background: true,
          // layout: 'total, sizes, prev, pager, next, jumper',
          // pageSizes: [10, 50, 100],
        },
      },
    },
  })
}
// #############################
