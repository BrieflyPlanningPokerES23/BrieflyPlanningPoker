<template>
  <component
    :is="tag"
    class="b-text"
    :class="{
      [`b-text--${align}`]: align,
      [`b-text--${color}`]: color,
      [`b-text--${size}`]: size,
    }"
  >
    <slot />
  </component>
</template>

<script lang="ts">
import { shouldBeOneOf } from 'vue-prop-validation-helper';

export default {
  name: 'BText',

  props: {
    align: {
      type: String,
      default: '',
      validator: shouldBeOneOf(['', 'left', 'center', 'right']),
    },
    color: {
      type: String,
      default: undefined,
      validator: shouldBeOneOf(['primary', 'accent', 'white', 'gray-10', 'gray-20', 'gray-30', 'black', 'link', 'error', 'success']),
    },
    size: {
      type: String,
      default: 'medium',
      validator: shouldBeOneOf(['small', 'medium', 'large', 'giant']),
    },
    tag: {
      type: String,
      default: 'span',
    },
  },
};
</script>

<style scoped lang="scss">
.b-text {
  color: inherit;
  font-family: var(--font-family);
  letter-spacing: normal;
  text-align: inherit;
  text-decoration: none;
  text-transform: none;
  white-space: pre-line;
}

@each $align in ('left', 'center', 'right') {
  .b-text--#{$align} {
    text-align: #{$align};
  }
}

@each $color in ('primary', 'accent', 'white', 'gray-10', 'gray-20', 'gray-30', 'black', 'link', 'error', 'success') {
  .b-text--#{$color} {
    color: var(--color-#{$color});
  }
}

@each $size in ('small', 'medium', 'large', 'giant') {
  .b-text--#{$size} {
    font-size: var(--font-size-#{$size});
    line-height: var(--line-height-#{$size});
  }
}
</style>
