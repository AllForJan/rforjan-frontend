<template>
  <div class="Map">
    <gmap-map class="Map__map"
      type="terrain"
      :center="center"
      :zoom="zoom"
      @idle="updateOverlays($event)"
      @bounds_changed="updateBounds($event)"
      @click="handleClick($event)"
      ref="map"
    >
      <div v-if="kulturnyDiel">
        <!--Kulturne diely-->
        <gmap-polygon
          v-for="(paths, $index) in kulturnyDiel.geometry.rings"
          :paths="paths"
          :editable="false"
          :key="`ud{$index}`"
          :options="{fillColor: 'yellow', strokeWeight: '1', strokeColor: 'yellow', pointerEvents: 'none'}"
        />

        <gmap-polygon
          v-for="(parcel, $index) in parcels"
          :paths="parcel.latLonShape"
          :editable="false"
          :key="`p${$index}`"
          :options="{strokeWeight: '1'}"
          @click="selectParcel(parcel)"
        />
      </div>

      <MapGroundOverlay
        v-if="bounds"
        :source="vupopOverlaySrc"
        :bounds="bounds"
      />
    </gmap-map>

    <div class="Map__loadingOverlay" v-if="isLoading">
      <Spinner size="large" />
    </div>

  </div>
</template>

<script>
  import {mapState, mapActions} from 'vuex'

  import Vupop from '../services/Vupop'
  import Service from '../services/Service'

  import Spinner from './Spinner'
  import MapGroundOverlay from './MapGroundOverlay'

  const extractLatLng = (latLng) => ({
    lat: latLng.lat(),
    lng: latLng.lng()
  })

  const extractBounds = (bounds) => ({
    northEast: extractLatLng(bounds.getNorthEast()),
    southWest: extractLatLng(bounds.getSouthWest()),
  })

  export default {
    components: {
      Spinner,
      MapGroundOverlay
    },

    props: {
    },

    data() {
      return {
        kulturnyDiel: null,
        isLoadingKulturnyDiel: false,
        parcels: [],

        bounds: null,
        isLoading: false,
        center: {lat: 49.06394971960525, lng: 21.191732156604985},
        zoom: 15
      }
    },

    computed: {
      ...mapState([
        'ziadost'
      ]),

      mapSize() {
        const {clientWidth: width, clientHeight: height} = this.$refs.map.$el
        return {width, height}
      },

      vupopOverlaySrc() {
        return this.bounds && Vupop.getMapTile(extractBounds(this.bounds), this.mapSize);
      }
    },

    methods: {
      ...mapActions([
        'storeZiadost'
      ]),

      updateBounds(bounds) {
        this.tmpBounds = bounds
      },

      updateOverlays() {
        this.bounds = this.tmpBounds
      },

      async loadParcels(kulturnyDiel) {
        const {LOKALITA, ZKODKD} = kulturnyDiel.attributes
        const parcels = (await Service.getParcelyForUzemnyDiel(LOKALITA, ZKODKD))
          .map((parcel) => {
            parcel.latLonShape = parcel.latLonShape.map(([lat, lng]) => ({lat, lng}))
            return parcel
          })

        return parcels
      },

      async handleClick(e) {
        const latLng = extractLatLng(e.latLng)

        this.isLoadingKulturnyDiel = true
        this.kulturnyDiel = null
        this.parcels = []

        try {
          this.kulturnyDiel = await Vupop.lookupKulturnyDiel(latLng)
          this.parcels = await this.loadParcels(this.kulturnyDiel)
        } catch (e) {
          console.error(e)
        } finally {
          this.isLoadingKulturnyDiel = false
        }
      },

      selectParcel(parcel) {
        alert(parcel.parcel_number)
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
