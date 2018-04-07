<script>
  import {MapElementMixin} from 'vue2-google-maps'

  export default {
    render() {
      return '';
    },

    mixins: [MapElementMixin],

    props: {
      source: true,
      bounds: true,
      opacity: true
    },

    created() {
    },

    deferredReady() {
      this.$overlay = new google.maps.GroundOverlay(this.source, {
        north: this.bounds.northEast.lng,
        south: this.bounds.southWest.lng,
        east: this.bounds.northEast.lat,
        west: this.bounds.southWest.lat,
      });

      this.$overlay.setOpacity(this.opacity);
      this.$overlay.setMap(this.$map);
    },

    destroyed() {
      this.$overlay.setMap(null);
    },
  }
</script>

<style lang="scss" scoped>
</style>
