<template>
  <div class="VupopOverlay">
    <img class="VupopOverlay__image" :src="src" />
  </div>
</template>

<script>
  import Vupop from '../services/Vupop'

  export default {
    props: {
      bounds: true,
      size: true
    },

    computed: {
      src() {
        return Vupop.getMapTile(this.bounds, this.size);
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
