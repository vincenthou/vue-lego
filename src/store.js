import Vue from 'vue'
import Vuex from 'vuex'
import {SET_CUR_COMPONENT, SET_COMPONENT_PROPS} from 'src/constants/mutations'

Vue.use(Vuex)
const store = new Vuex.Store({
  state: {
    currentComponent: null
  },
  mutations: {
    [SET_CUR_COMPONENT] (state, component) {
      state.currentComponent = component
    },
    [SET_COMPONENT_PROPS] (state, props) {
      state.componentProps = props
    }
  }
})

export default store
