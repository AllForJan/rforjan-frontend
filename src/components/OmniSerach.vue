<template>
  <div class="OmniSerach">
    <input class="OmniSerach__input form-control form-control-lg"
      type="text"
      placeholder="Meno / Názov firmy / IČO"
      :value="value"
      @input="input($event.target.value)"
      @keydown.esc="clear()"
    />

    <div class="OmniSerach__icon">
      <Icon icon="search" size="xl" />
    </div>
  </div>
</template>

<script>
  import Icon from './Icon'

  export default {
    components: {
      Icon
    },

    props: {
      value: true
    },

    data() {
      return {}
    },

    computed: {},

    methods: {
      input(value) {
        this.$emit('input', value)
      },

      clear() {
        this.input('')
      }
    },
  }
</script>

<style lang="scss" scoped>
  .OmniSerach {
    position: relative;
  }

  .OmniSerach__input {
    padding-right: 40px;
  }

  .OmniSerach__icon {
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;

    display: flex;
    justify-content: center;
    align-items: center;
    width: 46px;

    color: gray;
  }
</style>
