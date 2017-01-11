// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import Vuex from 'vuex'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-default/index.css'
import { Vue2Dragula } from 'vue2-dragula'
import 'dragula/dist/dragula.css'
import App from './App'

Vue.use(Vuex)
Vue.use(Vue2Dragula)
Vue.use(ElementUI)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  template: '<App/>',
  components: { App }
})
