<template>
  <div class="Map">
    <gmap-map
      class="Map__map"
      :class="{isOpen: !!kulturnyDiel }"
      type="terrain"
      :center="center"
      :zoom="zoom"
      @idle="updateOverlays($event)"
      @bounds_changed="updateBounds($event)"
      @click="handleClick($event)"
      ref="map"
    >

      <div v-if="!! kulturnyDiel">
        <!--Kulturne diely-->
        <gmap-polygon
          v-for="(paths, $index) in kulturnyDiel.geometry.rings"
          :paths="paths"
          :editable="false"
          :key="`ud{$index}`"
          :options="{fillColor: 'yellow', strokeWeight: '1', strokeColor: 'yellow', pointerEvents: 'none'}"
        />

        <!--Parcely-->
        <gmap-polygon
          v-for="(parcel, $index) in parcely"
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

    <Detail/>
  </div>
</template>

<script>
  import {mapState, mapActions} from 'vuex'

  import Vupop from '../services/Vupop'
  import Service from '../services/Service'

  import MapGroundOverlay from './MapGroundOverlay'
  import Detail from './/Detail'

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
      MapGroundOverlay,
      Detail
    },

    props: {},

    data() {
      return {
        bounds: null,
        center: {lat: 49.06394971960525, lng: 21.191732156604985},
        zoom: 15
      }
    },

    computed: {
      ...mapState([
        'kulturnyDiel',
        'ziadost',
        'parcely',
        'isLoading'
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
        'setKulturnyDiel',
        'setLoading'
      ]),

      updateBounds(bounds) {
        this.tmpBounds = bounds
      },

      updateOverlays() {
        this.bounds = this.tmpBounds
      },

      async handleClick(e) {
        const latLng = extractLatLng(e.latLng)

        this.setLoading(true)

        try {
          const kulturnyDiel = await Vupop.lookupKulturnyDiel(latLng)

          if (kulturnyDiel) {
            const {LOKALITA: lokalita, ZKODKD: diel} = kulturnyDiel.attributes

            const parcely = await Service.getParcelyForUzemnyDiel(lokalita, diel)
            const ziadosti = await Service.getZiadostiForUzemnyDiel(lokalita, diel)

            this.setKulturnyDiel({
              kulturnyDiel,
              parcely,
              ziadosti,
            });
          }
        } catch (e) {
          console.error(e)
        } finally {
          this.setLoading(false)
        }
      },

      selectParcel(parcel) {
        alert(parcel.parcel_number)
      }
    },

    mounted() {
      this.setLoading(false)
    }
  }
</script>

<style lang="scss" scoped>
  .Map {
    flex: 1 1 auto;

    position: relative;

    display: flex;
    flex-flow: row;
    align-items: stretch;
  }

  .Map__map {
    flex: 1 1 auto;
    flex-flow: row;
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
