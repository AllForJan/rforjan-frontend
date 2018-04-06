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
    </div>
  </div>
</template>

<script>
  export default {
    components: {},

    props: {},

    data() {
      return {
        name: '',
        isDisabled: true
      }
    },

    computed: {},

    methods: {
      logIn(e) {
        this.name = e
      }
    },
  }
</script>

<style lang="scss" scoped>

</style>
