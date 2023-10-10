<template>
  <Form
    class="f-task"
    :validation-schema="schema"
    @submit="onSubmit"
    @invalid-submit="onInvalidSubmit"
  >
    <BInputField
      label="Task title"
      name="taskTitle"
    >
      <BInput
        name="taskTitle"
        placeholder="Title"
        type="text"
      />
    </BInputField>

    <BInputField
      label="Task description"
      name="taskDescription"
    >
      <BTextArea
        name="taskDescription"
        placeholder="Description (optional)"
      />
    </BInputField>

    <div class="f-task__buttons-container">
      <BButton
        variant="transparent"
        value="cancel"
        @click="$emit('close')"
      />

      <BButton
        class="f-task__button"
        type="submit"
        value="create"
      />
    </div>
  </Form>
</template>

<script lang="ts">
import { useStore } from 'vuex';
import { Form } from 'vee-validate';
import * as Yup from 'yup';

import BButton from '../components/b-button.vue';
import BInput from '../components/b-input.vue';
import BInputField from '../components/b-input-field.vue';
import BTextArea from '../components/b-text-area.vue';

export default {
  name: 'FTask',

  components: {
    BButton,
    BInput,
    BInputField,
    BTextArea,
    Form,
  },
};
</script>

<script setup lang="ts">
const emit = defineEmits(['close']);
const store = useStore();

function onSubmit(values) {
  const newTask = {
    name: values.taskTitle,
    description: values.taskDescription,
  };
  store.dispatch('addTask', newTask);

  emit('close');
}

function onInvalidSubmit() {
  const submitButton = document.querySelector('.f-task__button');
  submitButton.classList.add('invalid');
  setTimeout(() => {
    submitButton.classList.remove('invalid');
  }, 1000);
}

const schema = Yup.object().shape({
  taskTitle: Yup.string().max(85).required(),
  taskDescription: Yup.string().max(300),
});
</script>

<style lang="scss" scoped>
.f-task {
  display: grid;
  margin-top: calc(var(--unit-0200) * -1);
  row-gap: var(--unit-0200);
  width: 280px;
}

.f-task__buttons-container {
  display: flex;
  gap: var(--unit-1000);
  width: 100%;
}
</style>
