<template>
  <Form
    ref="form"
    :validation-schema="schema"
    @submit="onSubmit"
  >
    <BInputField
      color="gray-30"
      label="Write a comment"
      name="addComment"
    >
      <BTextArea
        name="addComment"
        type="text"
        @keyup.enter="onKeyup"
      />
    </BInputField>
  </Form>
</template>

<script lang="ts">
import { Form } from 'vee-validate';
import * as Yup from 'yup';

import BInputField from '../components/b-input-field.vue';
import BTextArea from '../components/b-text-area.vue';

export default {
  name: 'FAddComment',

  components: {
    BInputField,
    BTextArea,
    Form,
  },

  methods: {
    onKeyup() {
      this.$refs.form.$el.dispatchEvent(new Event('submit', { cancelable: true }));
    },
  },
};
</script>

<script setup lang="ts">
const emit = defineEmits(['comment']);

function onSubmit(event) {
  emit('comment', event.addComment);
  /* eslint-disable no-undef */
  addComment.value = null;
  addComment.blur();
}

const schema = Yup.object().shape({
  addComment: Yup.string().min(1).max(180).trim(),
});
</script>
