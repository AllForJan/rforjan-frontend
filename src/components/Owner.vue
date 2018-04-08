<template>
  <div>
    <p v-for="owner in ownerNames">{{owner}}</p>
  </div>
</template>

<script>
export default {
  props: {
    owners: Object,
  },
  computed: {
    ownerNames() {
      if (!this.owners || this.owners.error) return [];
      const names = this.owners.value.map(value => value.Name);
      
      return names
    }
  },
}
</script>

<style>

</style>
