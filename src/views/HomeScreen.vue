<template>
  <div class="HomeScreen py-5">
    <div class="container">

      <OmniSerach v-model="searchQuery" />

    </div>
  </div>
</template>

<script>
  import OmniSerach from '../components/OmniSerach'

  export default {
    components: {
      OmniSerach
    },

    props: {},

    data() {
      return {
        searchQuery: ''
      }
    },

    computed: {},

    methods: {},
  }
</script>

<style lang="scss" scoped>
</style>
