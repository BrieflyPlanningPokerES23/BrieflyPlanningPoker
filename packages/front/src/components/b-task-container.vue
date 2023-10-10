<template>
  <BText
    align="left"
    color="white"
    size="giant"
    tag="h1"
  >
    {{ title }}
  </BText>

  <BText
    v-if="active"
    align="left"
    class="b-task-container__link"
    color="link"
    size="medium"
    tag="span"
    @click="toggleModal"
  >
    create new task
  </BText>

  <div
    v-if="tasks.length > 0"
    class="b-task-container__wrapper"
  >
    <BTask
      v-for="(task, index) in tasks"
      :active="active"
      :key="index"
      :task="task"
    />
  </div>

  <div
    v-else
    class="b-task-container__empty"
  >
    <BText
      align="center"
      color="gray-20"
      size="large"
      tag="p"
    >
      there are no tasks here (⊙︿⊙ ✿)
    </BText>
  </div>

  <BModal
    color="gray-20"
    :open="showModal"
  >
    <FTask @close="toggleModal" />
  </BModal>
</template>

<script lang="ts">
import { ref } from 'vue';

import BModal from '../components/b-modal.vue';
import BTask from '../components/b-task.vue';
import BText from '../components/b-text.vue';
import FTask from '../forms/f-task.vue';

export default {
  name: 'BTaskContainer',

  components: {
    BModal,
    BTask,
    BText,
    FTask,
  },

  props: {
    title: {
      type: String,
      required: true,
    },
    active: {
      type: Boolean,
      required: true,
    },
    tasks: {
      type: Array,
      required: true,
    },
  },
};
</script>

<script setup lang="ts">
const showModal = ref(false);
const toggleModal = () => {
  showModal.value = !showModal.value;
};
</script>

<style lang="scss" scoped>
.b-task-container__wrapper {
  display: grid;
  margin-top: var(--unit-0800);
  row-gap: var(--unit-0200);

  @media (min-width: 768px) {
    column-gap: var(--unit-0600);
    grid-template-columns: repeat(3, 1fr);
    row-gap: var(--unit-0400);
  }

  @media (min-width: 1200px) {
    column-gap: var(--unit-1000);
    grid-template-columns: repeat(4, 1fr);
    row-gap: var(--unit-0600);
  }
}

.b-task-container__empty {
  cursor: default;
  margin-top: var(--unit-0800);
}

.b-task-container__link {
  cursor: pointer;
}
</style>
