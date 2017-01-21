import Vue from 'vue'
import Vuex from 'vuex'
import {SET_CUR_COMPONENT} from 'src/constants/mutations'

Vue.use(Vuex)
const store = new Vuex.Store({
  state: {
    currentComponent: null
  },
  mutations: {
    [SET_CUR_COMPONENT] (state, component) {
      state.currentComponent = component
    }
  }
})

export default store
