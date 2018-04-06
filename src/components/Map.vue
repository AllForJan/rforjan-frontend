<template>
  <div class="Map">
    <gmap-map class="Map__map" :center="center" :zoom="zoom"></gmap-map>

    <div class="Map__loadingOverlay" v-if="isLoading">
      <Spinner size="large" />
    </div>
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

  import Spinner from './Spinner'

  export default {
    components: {
      Spinner
    },

    props: {},

    data() {
      return {
        isLoading: false,
        center: {lat: 48.14816, lng: 17.10674},
        zoom: 7
      }
    },

    computed: {},

    methods: {},

    mounted() {
      this.isLoading = true;

      setTimeout(() => {
        this.isLoading = false
      }, 1000)
    }
  }
</script>

<style lang="scss" scoped>
  .Map {
    flex: 1 1 auto;

    position: relative;

    display: flex;
    flex-flow: column;
    align-items: stretch;
  }

  .Map__map {
    flex: 1 1 auto;
  }

  .Map__loadingOverlay {
    position: absolute;
    top: 0;
    left: 0;

    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100%;

    background: rgba(black, .1);
  }
</style>
