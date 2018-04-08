<template>
  <div class="TheHeader">
    <div class="navbar navbar-expand-lg navbar-dark bg-dark">
      <router-link class="navbar-brand" :to="{name: 'home'}">
        #RFORJAN
      </router-link>

      <div class="navbar-nav">
        <div class="nav-item">
          <router-link class="nav-link" :to="{name: 'home'}">
            Home
          </router-link>
        </div>

        <div class="nav-item">
          <router-link class="nav-link" :to="{name: 'map'}">
            Map view
          </router-link>
        </div>
      </div>

      <div class="ml-auto text-white">
        <Spinner :is-white="true" v-if="isLoading">
          Kľud, robim…
        </Spinner>
      </div>
    </div>
  </div>
</template>

<script>
  import {mapGetters} from 'vuex'

  import Spinner from './Spinner'

  export default {
    components: {
      Spinner
    },

    props: {},

    data() {
      return {
      }
    },

    computed: {
      ...mapGetters([
        'isLoading'
      ])
    },

    methods: {
    },
  }
</script>

<style lang="scss" scoped>

</style>
