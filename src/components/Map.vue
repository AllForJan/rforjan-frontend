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
      <div v-if="selectedKulturnyDiel">
        <!--Kulturne diely-->
        <gmap-polygon
          v-for="(paths, $index) in selectedKulturnyDiel.geometry.rings"
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

      <!--<MapGroundOverlay :source="vupopOverlaySrc" v-if="bounds" :bounds="bounds" :opacity="0.5">-->
      <!--</MapGroundOverlay>-->
    </gmap-map>

    <VupopOverlay class="Map__vupopOverlay"
      :bounds="bounds"
      :size="size"
      v-if="bounds"
    />

    <div class="Map__loadingOverlay" v-if="isLoading">
      <Spinner size="large" />
    </div>

  </div>
</template>

<script>
  import {mapState, mapActions} from 'vuex'

  import Geodezy from '../services/Geodezy'
  import Vupop from '../services/Vupop'
  import Service from '../services/Service'
  import FakeAPI from '../services/FakeAPI'

  import Spinner from './Spinner'
  import VupopOverlay from './VupopOverlay'
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
      VupopOverlay,
      MapGroundOverlay
    },

    props: {
    },

    data() {
      return {
        selectedKulturnyDiel: null,
        isLoadingKulturnyDiel: false,
        parcels: [],

        bounds: null,
        isLoading: false,
        center: {lat: 49.06394971960525, lng: 21.191732156604985},
        zoom: 15,
        markers: [{
          position: {lat: 0, lng: 0}
        }],
        geoJSONs: []
      }
    },

    computed: {
      ...mapState([
        'ziadost'
      ]),

      size() {
        const {clientWidth: width, clientHeight: height} = this.$refs.map.$el
        return {width, height}
      },

      vupopOverlaySrc() {
        return this.bounds && Vupop.getMapTile(this.bounds, this.size);
      },

      geoJSONs_converted: function () {

        return this.geoJSONs.map((geoJSON)=>{
          const paths = geoJSON.features[0].geometry.coordinates[0].map((coordinate)=>({lat: coordinate[1], lng: coordinate[0]}));
          return {
            key: Math.random(),//todo better
            paths
          };
        });

      }
    },

    methods: {
      ...mapActions([
        'storeZiadost'
      ]),

      updateBounds(e) {
        this.tmpBounds = extractBounds(e)
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
        this.selectedKulturnyDiel = null
        this.parcels = []

        try {
          this.selectedKulturnyDiel = await Vupop.lookupKulturnyDiel(latLng)
          this.parcels = await this.loadParcels(this.selectedKulturnyDiel)
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
