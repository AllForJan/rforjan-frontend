<template>
  <div class="TheHeader">
    <router-link :to="{name: 'home'}">
      #RFORJAN
    </router-link>

    <router-link :to="{name: 'home'}">
      Home
    </router-link>

    <router-link :to="{name: 'map'}">
      Map view
    </router-link>
  </div>
</template>

<script>
  export default {
    components: {
    },

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
