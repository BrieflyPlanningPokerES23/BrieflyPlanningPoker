<template>
  <div class="b-text-area__wrapper">
    <textarea
      class="b-text-area"
      :id="name"
      :name="name"
      :placeholder="placeholder"
      :row="row"
    />
  </div>
</template>

<script lang="ts">
export default {
  name: 'BTextArea',

  props: {
    name: {
      type: String,
      required: true,
    },
    placeholder: {
      type: String,
      default: undefined,
    },
    row: {
      type: Number,
      default: undefined,
    },
  },
};
</script>

<style scoped lang="scss">
.b-text-area {
  background-color: transparent;
  border: none;
  font-family: inherit;
  font-size: inherit;
  padding: var(--unit-0200);
  resize: vertical;
  width: 100%;
}

.b-text-area__wrapper {
  background-color: var(--color-white);
  border-radius: var(--unit-0100);
  display: flex;
  justify-content: start;
}
</style>
