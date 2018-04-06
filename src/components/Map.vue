<template>
  <div class="Map">
    <gmap-map class="Map__map" :center="center" :zoom="zoom"></gmap-map>
  </div>
</template>

<script>
  const GOOGLE_MAPS_API_KEY = 'AIzaSyDcJh16iZXgo9jQz94XJ3W2BsPJ29xt-Gk'

  import Vue from 'vue'
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

  export default {
    name: '',

    components: {},

    props: {},

    data() {
      return {
        center: {lat: 48.14816, lng: 17.10674},
        zoom: 7
      }
    },

    computed: {},

    methods: {},
  }
</script>

<style lang="scss" scoped>
  .Map {
    flex: 1 1 auto;

    display: flex;
    flex-flow: column;
    align-items: stretch;
  }

  .Map__map {
    flex: 1 1 auto;
  }
</style>
