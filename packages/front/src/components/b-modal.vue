<template>
  <div
    class="b-modal__external"
    v-if="open"
  >
    <div class="b-modal">
      <BContainer :color="color">
        <slot />
      </BContainer>
    </div>
  </div>
</template>

<script lang="ts">
import BContainer from './b-container.vue';

export default {
  name: 'BModal',

  components: {
    BContainer,
  },

  props: {
    open: {
      type: Boolean,
      required: true,
    },
    color: {
      type: String,
      default: undefined,
    },
  },
};
</script>

<style lang="scss" scoped>
.b-modal__external {
  background-color: rgba(0, 0, 0, 0.7);
  height: 100%;
  left: 0;
  overflow-x: hidden;
  overflow-y: auto;
  position: fixed;
  top: 0;
  width: 100%;
  z-index: 100;
}

.b-modal {
  display: flex;
  justify-content: center;
  margin-top: 10vh;
}
</style>
