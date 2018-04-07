import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const TYPES = {
  STORE_ZIADOST: 'STORE_ZIADOST'
}

export default new Vuex.Store({
  state: {
    ziadost: null
  },

  actions: {
    storeZiadost({commit}, ziadost) {
      commit(TYPES.STORE_ZIADOST, {ziadost})
    }
  },

  mutations: {
    [TYPES.STORE_ZIADOST](state, {ziadost}) {
      state.ziadost = ziadost
    }
  }
})


