<template>
  <div class="Map">
    <gmap-map class="Map__map"
      type="terrain"
      :center="center"
      :zoom="zoom"
      @idle="updateOverlays()"
      @bounds_changed="updateBounds($event)"
      @click="handleClick($event)"
    >
      <gmap-marker
        :key="index"
        v-for="(m, index) in markers"
        :position="m.position"
        :clickable="true"
        :draggable="true"
        @click="center=m.position"
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
  import Geodezy from '../services/Geodezy'

  import Spinner from './Spinner'
  import VupopOverlay from './VupopOverlay'

  const extractLatLng = (latLng) => ({
    lat: latLng.lat(),
    lng: latLng.lng()
  })

  const extractBounds = (bounds) => {
    return {
      northEast: extractLatLng(bounds.getNorthEast()),
      southWest: extractLatLng(bounds.getSouthWest()),
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
        center: {lat: 48.743622, lng: 18.913816},
        zoom: 8,
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
      updateBounds(e) {
        this.tmpBounds = extractBounds(e)
      },

      updateOverlays() {
        this.bounds = this.tmpBounds
      },

      async handleClick(e) {
        const latLng = extractLatLng(e.latLng)
        const result = await Geodezy.lookParcel(latLng)

        console.log('result', result)
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
