<template>
  <div class="b-badge">
    <BText
      color="white"
      size="medium"
    >
      <slot />
    </BText>

    <font-awesome-icon
      class="b-badge__xmark"
      icon="fa-solid fa-xmark"
      @click="$emit('action')"
    />
  </div>
</template>

<script lang="ts">
import BText from '../components/b-text.vue';

export default {
  name: 'BBadge',

  components: {
    BText,
  },

  emits: ['action'],
};
</script>

<style lang="scss" scoped>
.b-badge {
  align-items: center;
  background-color: var(--color-black);
  border-radius: var(--unit-0200);
  column-gap: var(--unit-0200);
  cursor: default;
  display: flex;
  padding: var(--unit-0100) var(--unit-0200);
}

.b-badge__xmark {
  color: var(--color-white);
  cursor: pointer;
  height: var(--unit-0400);

  &:hover {
    color: var(--color-accent);
  }
}
</style>
