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

      <div v-for="geoJSON_converted in geoJSONs_converted" :key="geoJSON_converted.key">
          <gmap-polygon :paths="geoJSON_converted.paths" :editable="false"  @click="setPoint($event)"
          ref="polygon">
      </gmap-polygon>
      </div>
      
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
        center: {lat: 48.463216762111877, lng: 19.420810769910112},
        zoom: 16,
        markers: [{
          position: {lat: 0, lng: 0}
        }],
        geoJSONs: [{"type":"FeatureCollection","crs":{"type":"name","properties":{"name":"EPSG:4326"}},"features":[{"type":"Feature","id":2182,"geometry":{"type":"Polygon","coordinates":[[[19.420810769910112,48.463216762111877],[19.421404142950699,48.463640672794369],[19.421917171104205,48.464010713895057],[19.422022275785647,48.464101539097491],[19.42201853204827,48.464170542066618],[19.421866654607989,48.464215874659573],[19.421671169932257,48.464266319933401],[19.421533027420875,48.46428366830753],[19.421419828932486,48.464268805378588],[19.421350490241295,48.464279862688073],[19.421266421161935,48.464328384825038],[19.421207831552323,48.464373332521411],[19.421118401417989,48.464404909959576],[19.420972596826182,48.464426679613453],[19.420859890616299,48.464407056864772],[19.420771134279597,48.464364704147243],[19.420688254865766,48.464334574754837],[19.420581188351083,48.464329536710963],[19.420299793761902,48.464378319130631],[19.419966204565533,48.464479513385157],[19.41976156979295,48.464548599299874],[19.419639994886793,48.464578662817061],[19.419450371890015,48.464607905511464],[19.419344554151809,48.464590996696366],[19.419357757630657,48.464534367294767],[19.419598200653681,48.464330990882409],[19.42000957550529,48.464004445924999],[19.420236011316959,48.463831421208383],[19.420537324992544,48.463561719233354],[19.420630246308857,48.46343011540538],[19.420810769910112,48.463216762111877]]]},"properties":{"FID":2182,"ROK":2016,"ID_KD":93402,"ID_PB":0,"ZKODKD":"9003/1","VYMERA":1.28,"KODKD":"399126003/1","LOKALITA":"ĂbelovĂˇ","KULTURA":"TTP","SPOSOBILOS":"spĂ´sobilĂ˝","SHAPE_Leng":544.17385454299995,"SHAPE_Area":12875.398824399999}}]}]
      }
    },

    computed: {
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
        this.tmpBounds = extractBounds(e)
      },

      updateOverlays() {
        this.bounds = this.tmpBounds
      },

      async handleClick(e) {

        this.setPoint(e);
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
