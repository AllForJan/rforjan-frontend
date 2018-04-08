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

  getters: {
    ziadost: (state) => state.ziadost,
    detailTableData: (state) => {
      if (!state.ziadost) return [];
      
      return Object.keys(state.ziadost).map(year => {
        const personIds = Object.keys(state.ziadost[year]);
        const ziadosti = personIds.map(personId => {
          const personData = {
            ...state.ziadost[year][personId].ziadosti,
            isPrijimatel: Boolean(state.ziadost[year][personId].prijimatelia),
          }
          console.log('------------------------------------');
          console.log(personData);
          console.log('------------------------------------');
        });
      })
    },
  },

  mutations: {
    [TYPES.STORE_ZIADOST](state, {ziadost}) {
      state.ziadost = ziadost
    }
  }
})


