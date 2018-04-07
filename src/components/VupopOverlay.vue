<template>
  <div class="VupopOverlay">
    <img class="VupopOverlay__image" :src="src" />
  </div>
</template>

<script>
  import proj4 from 'ol/proj'
  import Projection from 'ol/proj/projection';

  const stringifyQueryParams = (params) => {
    return Object.entries(params).map(([key, value]) => {
      return `${key}=${decodeURIComponent(value)}`
    }).join('&')
  }

  const makeUrl = (baseUrl, params) => {
    return `${baseUrl}?${stringifyQueryParams(params)}`
  }

  const convertCoordinate = ({lat, lng}) => {
    // transform WGS84 -> JTSK
    const source = new Projection({code: 'EPSG:4326'}) // WGS84
    const destination = new Projection({code: 'EPSG:5514'}) // JTSK
    const coordinates = proj4.transform([lat, lng], 'EPSG:4326', 'EPSG:5514');
    debugger
    console.log([lat, lng], coordinates)
    return coordinates
  }

  const getUrl = (bounds, size) => {
    const baseUrl = 'https://portal.vupop.sk/arcgis/rest/services/LPIS/LPIS_verejnost/MapServer/export'
    const {width, height} = size

    const northEast = convertCoordinate(bounds.northEast)
    const southWest = convertCoordinate(bounds.southWest)
    const bbox = [-northEast.x, -northEast.y, -southWest.x, -southWest.y];

    const params = {
      dpi: '96',
      transparent: 'true',
      format: 'png32',
      layers: 'show:0,1,3,4,5,6,7,8,9,26',
      bbox: bbox.join(','),
      bboxSR: '102067',
      imageSR: '102067',
      size: `${width},${height}`,
      f: 'image'
    }

    const url = makeUrl(baseUrl, params)

    return url;
  }

  export default {
    name: '',

    components: {},

    props: {
      bounds: true,
      size: true
    },

    computed: {
      src() {
        return getUrl(this.bounds, this.size)
      }
    },

    methods: {
    }
  }
</script>

<style lang="scss" scoped>
  .VupopOverlay {
    position: relative;
  }


</style>
