<template>
    <div class="MapView">
      <Map />
    </div>
</template>

<script>
  import Map from '../components/Map'

	export default {
		components: {
      Map
    },

		props: {},

		data() {
			return {}
		},

		computed: {},

		methods: {},
	}
</script>

<style lang="scss" scoped>
  .MapView {
    display: flex;
    flex-flow: column;
    align-items: stretch;
  }
</style>
