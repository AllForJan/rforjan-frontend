<template>
    <font-awesome-icon class="Icon" :icon="icon" v-bind="$attrs" />
</template>

<script>
  import FontAwesomeIcon from '@fortawesome/vue-fontawesome'

	export default {
		components: {
      FontAwesomeIcon
    },

		props: {
		  icon: true
    }
	}
</script>

<style lang="scss" scoped>
</style>
