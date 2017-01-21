// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-default/index.css'
import App from './App'
import store from './store'

Vue.use(ElementUI)

// TODO: This should be made dynamically later on
import 'mint-ui/lib/style.css'
import Mint from 'mint-ui'
Vue.use(Mint)

/* eslint-disable no-new */
new Vue({
  store,
  render: h => h(App)
}).$mount('#app')
