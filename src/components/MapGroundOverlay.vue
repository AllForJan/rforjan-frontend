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
      opacity: true,
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

        // Propagate click from overlay to map
        google.maps.event.addListener(this.$overlay, 'click', (e) => {
          google.maps.event.trigger(this.$map, 'click', e)
        })


        //======================================todo is thare a better way to create rotated tile?
        const rotation = -4.10;//todo from props this.props.rotation;
        function rotateNewTile(loadTile){
          //console.log(`Trying to roatate imageTile ${rotation}deg.`);
          const imageTile = loadTile();
          if(!imageTile){
            requestAnimationFrame(()=>rotateNewTile(loadTile));
          }else{
            imageTile.style.transform = `rotate(${rotation}deg)`;
          }
        }
        rotateNewTile(()=>document.querySelector(`img[src="${this.source}"]`));
        //======================================


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
