<template>
  <div class="Detail">
    <h1>Detail</h1>
    <ul>
      <li v-for="(value, key) in data" :key="key">{{key}}</li>
    </ul>
  </div>
</template>

<script>
  import { mapGetters } from 'vuex';
  
  export default {
    computed: mapGetters({
      data: 'ziadost',
    }),
  }
</script>


<style lang="scss" scoped>
  .Detail {
    flex: 1;
  }
</style>

