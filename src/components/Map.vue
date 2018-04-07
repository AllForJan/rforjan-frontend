<template>
  <div class="Map">
    <gmap-map class="Map__map" type="terrain" :center="center" :zoom="zoom" @bounds_changed="recomputeBoundaries($event)">
      <gmap-marker
        :key="index"
        v-for="(m, index) in markers"
        :position="m.position"
        :clickable="true"
        :draggable="true"
        @click="center=m.position"
      ></gmap-marker>

      <gmap-polygon v-if="paths.length > 0" :paths="paths" :editable="true" @paths_changed="updateEdited($event)"
          @rightclick="handleClickForDelete"
          ref="polygon">
      </gmap-polygon>


      />
    </gmap-map>

    <VupopOverlay class="Map__vupopOverlay"
      :bounds="bounds"
      :size="{width: 986, height: 398}"
      v-if="bounds"
    />

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
  import VupopOverlay from './VupopOverlay'

  const extractBounds = (bounds) => {
    const convert = (point) => ({
      lat: point.lat(),
      lng: point.lng()
    })

    return {
      northEast: convert(bounds.getNorthEast()),
      southWest: convert(bounds.getSouthWest()),
    }
  }

  export default {
    components: {
      Spinner,
      VupopOverlay
    },

    props: {},

    data() {
      return {
        bounds: null,
        isLoading: false,
        center: {lat: 48.14816, lng: 17.10674},
        zoom: 7,
        markers: [{
          position: {lat: 50, lng: 14}
        }, {
          position: {lat: 11.0, lng: 11.0}
        }],
        paths: [
          {lat: 50, lng: 14},
          {lat: 50, lng: 18},
          {lat: 47, lng: 18},
          {lat: 47, lng: 14}
        ]
      }
    },

    computed: {},

    methods: {
      recomputeBoundaries(e) {
        this.bounds = extractBounds(e)
      }
    },

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

  .Map__vupopOverlay,
  .Map__vupopOverlay.VupopOverlay {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    pointer-events: none;
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
