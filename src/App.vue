<template>
  <div id="app" class="App">
    <TheHeader class="App__header"/>
    <router-view class="App__content"/>
  </div>
</template>

<script>
  import TheHeader from '@/components/TheHeader'

  export default {
    name: 'App',

    components: {
      TheHeader
    },
  }
</script>

<style lang="scss" scoped>
  @import './variables';

  .App {
    display: flex;
    flex-flow: column;
    align-items: stretch;
    height: 100vh;

    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

  .App__header {
    flex: 0 0 auto;
  }

  .App__content {
    flex: 1 1 auto;
    background: whitesmoke;
  }
</style>
