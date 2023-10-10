<template>
  <div
    class="b-container"
    :class="`b-container--${color}`"
  >
    <slot />
  </div>
</template>

<script lang="ts">
import { shouldBeOneOf } from 'vue-prop-validation-helper';

export default {
  name: 'BContainer',

  props: {
    color: {
      type: String,
      default: 'black',
      validator: shouldBeOneOf(['primary', 'white', 'gray-10', 'gray-20', 'gray-30', 'black']),
    },
  },
};
</script>

<style scoped lang="scss">
.b-container {
  border-radius: var(--unit-0300);
  color: var(--color-white);
  display: grid;
  justify-content: center;
  padding: var(--unit-0400);

  @media (min-width: 768px) {
    padding: var(--unit-1000);
  }
}

@each $color in ('primary', 'white', 'gray-10', 'gray-20', 'gray-30', 'black') {
  .b-container--#{$color} {
    background-color: var(--color-#{$color});
  }
}

.b-container--white {
  color: var(--color-black);
}
</style>
