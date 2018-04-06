<template>
  <div class="Spinner" :class="modifierClass">
    <div class="Spinner__text" if="$slots.default">
      <slot></slot>
    </div>
  </div>
</template>

<script>
  export default {
    props: {
      size: true,
      isWhite: true
    },

    computed: {
      modifierClass() {
        return {
          'isLarge': this.size === 'large',
          'isSmall': this.size === 'small',
          'isWhite': this.isWhite,
        }
      }
    }
  }
</script>

<style lang="scss">
  $Spinner__color: gray;

  .Spinner {
    display: inline-flex;
    align-items: center;

    vertical-align: middle;

    &::before {
      content: '';

      display: inline-block;
      width: 24px;
      height: 24px;

      border: 3px solid rgba($Spinner__color, .3);
      border-top-color: $Spinner__color;
      border-radius: 100%;

      vertical-align: middle;

      animation: Spinner__animation .7s infinite linear;
    }

    &.isSmall {
      &::before {
        width: 16px;
        height: 16px;

        border-width: 2px;
      }
    }

    &.isLarge {
      font-size: 1.1rem;

      &::before {
        width: 32px;
        height: 32px;

        border-width: 3px;
      }
    }

    &.isWhite {
      &::before {
        border-color: rgba(white, .3);
        border-top-color: white;
      }
    }
  }

  .Spinner__text {
    margin-left: .5rem;
  }

  @keyframes Spinner__animation {
    0% {transform: rotate(0deg);}
    100% {transform: rotate(360deg);}
  }
</style>
