import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    collapse: false,
    tagsList:[]

  },
  mutations: {
    changeCollapse(state) {
      state.collapse = !state.collapse
    },
    setTagsList(state,data) {
      state.tagsList = data
    }
  },
  actions: {

  }
})