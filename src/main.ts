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
    dialog: {
      showClose: false,
    },
    button: {
      plain: true,
    },
    confirm: {
      round: true,
    },
  })
}
// #############################
