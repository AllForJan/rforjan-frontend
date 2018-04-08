import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const TYPES = {
  STORE_ZIADOST: 'STORE_ZIADOST',
  KULTURNY_DIEL_SET: 'KULTURNY_DIEL_SET',
  KULTURNY_DIEL_CLEARED: 'KULTURNY_DIEL_CLEARED'
}

export default new Vuex.Store({
  state: {
    kulturnyDiel: null,
    ziadosti: null,
    parcely: null,

    ziadost: null
  },

  actions: {
    storeZiadost({commit}, ziadost) {
      commit(TYPES.STORE_ZIADOST, {ziadost})
    },

    setKulturnyDiel({commit}, {kulturnyDiel, ziadosti, parcely}) {
      commit(TYPES.KULTURNY_DIEL_SET, {kulturnyDiel, ziadosti, parcely})
    },

    clearKulturnyDiel({commit}) {
      commit(TYPES.KULTURNY_DIEL_CLEARED)
    }
  },

  getters: {
    ziadosti: (state) => state.ziadosti,
    parcely: (state) => state.parcely,
    kulturnyDiel: (state) => state.kulturnyDiel,

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
    },

    [TYPES.KULTURNY_DIEL_SET](state, {kulturnyDiel, ziadosti, parcely}) {
      state.kulturnyDiel = kulturnyDiel
      state.parcely = parcely
      state.ziadosti = ziadosti
    },

    [TYPES.KULTURNY_DIEL_CLEARED](state) {
      state.kulturnyDiel = null
      state.parcely = null
      state.ziadosti = null
    }
  }
})


