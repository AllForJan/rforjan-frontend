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
      this.updateOverlay()
    },

    methods: {
      updateOverlay() {
        this.clearOverlay()

        this.$overlay = new google.maps.GroundOverlay(this.source, this.bounds);
        this.$overlay.setMap(this.$map);
      },

      clearOverlay() {
        if (this.$overlay) {
          this.$overlay.setMap(null)
        }
      }
    },

    destroyed() {
      this.clearOverlay()
    },

    watch: {
      source() {
        this.updateOverlay()
      }
    }
  }
</script>

<style lang="scss" scoped>
</style>
