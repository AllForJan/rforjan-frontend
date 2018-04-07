// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import fontawesome from '@fortawesome/fontawesome'
import freeSolidIcons from '@fortawesome/fontawesome-free-solid'
import store from './store'

fontawesome.library.add(freeSolidIcons)

import './assets/styles/app.scss'

Vue.config.productionTip = false

const GOOGLE_MAPS_API_KEY = 'AIzaSyDcJh16iZXgo9jQz94XJ3W2BsPJ29xt-Gk'

import * as VueGoogleMaps from 'vue2-google-maps'

Vue.use(VueGoogleMaps, {
  load: {
    key: GOOGLE_MAPS_API_KEY,
    // libraries: 'places,drawing,visualization'
    // libraries: 'places', // This is required if you use the Autocomplete plugin
    // OR: libraries: 'places,drawing'
    // OR: libraries: 'places,drawing,visualization'
    // (as you require)
  }
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
