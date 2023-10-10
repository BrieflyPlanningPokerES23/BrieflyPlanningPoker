<template>
  <div class="b-input__wrapper">
    <input
      class="b-input"
      :id="name"
      :max="max"
      :min="min"
      :name="name"
      :placeholder="placeholder"
      :step="step"
      :type="type"
      :value="value"
    >
  </div>
</template>

<script lang="ts">
import { shouldBeOneOf } from 'vue-prop-validation-helper';

export default {
  name: 'BInput',

  props: {
    max: {
      type: Number,
      default: undefined,
    },
    min: {
      type: Number,
      default: undefined,
    },
    name: {
      type: String,
      required: true,
    },
    placeholder: {
      type: String,
      default: undefined,
    },
    step: {
      type: Number,
      default: undefined,
    },
    type: {
      type: String,
      default: 'text',
      validator: shouldBeOneOf(['email', 'number', 'password', 'text']),
    },
    value: {
      type: [String, Number],
      default: undefined,
    },
  },
};
</script>

<style scoped lang="scss">
.b-input {
  background-color: transparent;
  border: none;
  font-family: inherit;
  font-size: inherit;
  padding: var(--unit-0200);
  width: 100%;
}

.b-input__wrapper {
  align-items: center;
  background-color: var(--color-white);
  border-radius: var(--unit-0100);
  display: flex;
  height: var(--unit-1000);
  justify-content: start;
}
</style>
