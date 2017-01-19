// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import Vuex from 'vuex'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-default/index.css'
import App from './App'

Vue.use(Vuex)
Vue.use(ElementUI)

// TODO: This should be made dynamically later on
import 'mint-ui/lib/style.css'
import Mint from 'mint-ui'
Vue.use(Mint)

Vue.component('component-proxy', {
  props: {
    name: {
      type: String,
      required: true
    },
    props: {
      type: Object,
      required: true
    }
  },
  render (createElem) {
    var self = this
    return createElem(this.name, {
      props: this.props,
      on: {
        change (value) {
          self.value = value
        }
      }
    })
  }
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  template: '<App/>',
  components: { App }
})
