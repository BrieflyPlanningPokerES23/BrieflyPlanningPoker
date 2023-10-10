<template>
  <button
    class="b-card"
    :class="active ? 'b-card--active' : 'b-card--disabled'"
  >
    <BText
      align="center"
      size="giant"
    >
      {{ value }}
    </BText>
  </button>
</template>

<script lang="ts">
import BText from '../components/b-text.vue';

export default {
  name: 'BCard',

  components: {
    BText,
  },

  props: {
    active: {
      type: Boolean,
      default: true,
    },
    value: {
      type: Number,
      default: undefined,
    },
  },
};
</script>

<style lang="scss" scoped>
.b-card {
  align-items: center;
  background-color: var(--color-white);
  border: var(--unit-0050) solid var(--color-primary);
  border-radius: var(--unit-0100);
  color: var(--color-primary);
  display: flex;
  height: var(--unit-2000);
  justify-content: center;
  width: var(--unit-1300);
}

.b-card--active {
  cursor: pointer;

  &:hover {
    border-color: var(--color-accent);
    color: var(--color-accent);
  }
}

.b-card--disabled {
  background-color: transparent;
  border: none;
  color: var(--color-gray-20);
  cursor: default;
}
</style>
