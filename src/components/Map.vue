<template>
  <div class="Map">
    <gmap-map class="Map__map"
      type="terrain"
      :center="center"
      :zoom="zoom"
      @idle="updateOverlays($event)"
      @bounds_changed="updateBounds($event)"
      @click="handleClick($event)"
    >
      <div v-for="geoJSON_converted in geoJSONs_converted" :key="geoJSON_converted.key">
          <gmap-polygon :paths="geoJSON_converted.paths" :editable="false"  @click="setPoint($event)"
          ref="polygon">
      </gmap-polygon>
      </div>

    </gmap-map>
    />

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
  import {mapState, mapActions} from 'vuex'

  import Geodezy from '../services/Geodezy'
  import FakeAPI from '../services/FakeAPI'

  import Spinner from './Spinner'
  import VupopOverlay from './VupopOverlay'

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
      VupopOverlay
    },

    props: {},

    data() {
      return {
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

      recomputeBoundaries(e) {
        this.bounds = extractBounds(e)
      },
      setPoint(e){
        const center = this.markers[0].position;



        center.lat = e.latLng.lat();
        center.lng = e.latLng.lng();

        console.log(center.lat,center.lng);

        this.paths=[
          {lat: center.lat-1, lng: center.lng-1},
          {lat: center.lat+1, lng: center.lng-1},
          {lat: center.lat+1, lng: center.lng+1},
          {lat: center.lat-1, lng: center.lng+1}
        ];
      },

      updateBounds(e) {
        const center = extractLatLng(e.getCenter())

        console.log('center', center)

        this.tmpBounds = extractBounds(e)
      },

      updateOverlays() {
        this.bounds = this.tmpBounds
      },

      async handleClick(e) {
        // this.setPoint(e);
        // const latLng = extractLatLng(e.latLng)
        // const result = await Geodezy.getParcel(latLng)
        //
        // this.geoJSONs=[await FakeAPI.getDummyGeoJSON(latLng)];

        // const result = await Geodezy.lookParcel(latLng)
        // console.log('result', result)
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
