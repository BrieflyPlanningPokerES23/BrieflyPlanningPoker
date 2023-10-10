<template>
  <div class="b-input-field">
    <div class="b-input-field__label">
      <BText
        :for="name"
        :color="color"
        tag="label"
      >
        {{ label }}
      </BText>

      <BText
        v-if="link"
        color="link"
        tabindex="-1"
        tag="a"
        :href="link[0]"
      >
        {{ link[1] }}
      </BText>
    </div>

    <div
      :error="errorMessage"
      :value="inputValue"
      @input="handleChange"
      @blur="handleBlur"
    >
      <slot />
    </div>

    <BText
      class="error"
      color="error"
      size="small"
      tag="div"
    >
      {{ errorMessage }}
    </BText>
  </div>
</template>

<script lang="ts">
import { toRef } from 'vue';
import { useField } from 'vee-validate';

import BText from './b-text.vue';

export default {
  name: 'BInputField',

  components: {
    BText,
  },

  props: {
    name: {
      type: String,
      required: true,
    },
    color: {
      type: String,
      default: 'white',
    },
    initial: {
      type: [String, Number],
      default: undefined,
    },
    label: {
      type: String,
      required: true,
    },
    link: {
      type: [String, Array],
      default: undefined,
    },
  },

  setup(props) {
    const name = toRef(props, 'name');

    const {
      value: inputValue,
      errorMessage,
      handleBlur,
      handleChange,
    } = useField(name, undefined, {
      initialValue: props.initial,
    });

    return { inputValue, errorMessage, handleBlur, handleChange };
  },
};
</script>

<style scoped lang="scss">
.b-input-field {
  display: grid;
  font-family: var(--font-family);
  font-size: var(--unit-0400);
  row-gap: var(--unit-0200);
}

.b-input-field__label {
  display: flex;
  justify-content: space-between;
}
</style>
