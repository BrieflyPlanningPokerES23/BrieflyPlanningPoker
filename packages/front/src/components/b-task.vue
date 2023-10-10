<template>
  <div
    class="b-task"
    :class="active ? 'b-task--active' : 'b-task--archived'"
  >
    <div class="b-task__name-wrapper">
      <BText
        align="left"
        class="b-task__name"
        size="medium"
        tag="strong"
        @click="toggleExpandedTaskModal(task.task, false)"
      >
        {{ task.name }}
      </BText>
    </div>

    <div class="b-task__info-wrapper">
      <div
        v-if="task.finished"
        class="b-task__round"
      >
        <font-awesome-icon
          v-if="!!task.points"
          class="b-task__icon"
          icon="fa-solid fa-circle-check"
        />
        <font-awesome-icon
          v-else
          class="b-task__icon"
          icon="fa-solid fa-circle-xmark"
        />

        <BText
          align="right"
          size="large"
          tag="p"
        >
          {{ task.points ? `${task.points} ${task.points > 1 ? 'points' : 'point'}` : 'incomplete' }}
        </BText>
      </div>

      <div
        v-else
        class="b-task__round"
      >
        <font-awesome-icon
          class="b-task__icon"
          icon="fa-solid fa-arrow-rotate-right"
        />

        <BText
          align="right"
          size="large"
          tag="p"
        >
          {{ `${task.currentRound || 1} / ${task.maxRounds}` }}
        </BText>
      </div>

      <div class="b-task__buttons">
        <font-awesome-icon
          v-if="active"
          class="b-task__icon"
          icon="fa-solid fa-lock"
          @click="toggleArchiveModal()"
        />

        <font-awesome-icon
          class="b-task__icon"
          icon="fa-solid fa-trash-can"
          @click="toggleDeleteModal()"
        />
      </div>
    </div>
  </div>

  <BModal
    color="gray-10"
    :open="expandedTaskModal"
  >
    <BTaskExpanded
      :task-id="taskId"
      :squad-id="squadId"
      @close="toggleExpandedTaskModal(taskId, true)"
    />
  </BModal>

  <BModal
    color="gray-30"
    :open="archiveModal"
  >
    <FConfirmation
      action="archive"
      message="Are you sure you want to archive this task? This action is IRREVERSIBLE"
      @close="toggleArchiveModal()"
      @confirm="store.dispatch('disableTask', task.task), toggleArchiveModal()"
    />
  </BModal>

  <BModal
    color="gray-30"
    :open="deleteModal"
  >
    <FConfirmation
      action="delete"
      message="Are you sure you want to delete this task? This action is IRREVERSIBLE"
      @close="toggleDeleteModal()"
      @confirm="store.dispatch('deleteTask', task.task), toggleDeleteModal()"
    />
  </BModal>
</template>

<script lang="ts">
import { computed, ref } from 'vue';
import { useStore } from 'vuex';

import BModal from '../components/b-modal.vue';
import BTaskExpanded from '../components/b-task-expanded.vue';
import BText from '../components/b-text.vue';

import FConfirmation from '../forms/f-confirmation.vue';

export default {
  name: 'BTask',

  components: {
    BModal,
    BTaskExpanded,
    BText,
    FConfirmation,
  },

  props: {
    task: {
      type: Object,
      required: true,
    },
    active: {
      type: Boolean,
      default: true,
    },
  },
};
</script>

<script setup lang="ts">
const store = useStore();

const squadId = computed(() => store.getters.getActiveId);

const taskId = ref(null);

const expandedTaskModal = ref(false);

function toggleExpandedTaskModal(task, refresh) {
  taskId.value = task;
  if (refresh) {
    store.dispatch('gatherTasks', squadId.value);
  }

  expandedTaskModal.value = !expandedTaskModal.value;
}

const archiveModal = ref(false);

function toggleArchiveModal() {
  archiveModal.value = !archiveModal.value;
}

const deleteModal = ref(false);

function toggleDeleteModal() {
  deleteModal.value = !deleteModal.value;
}
</script>

<style lang="scss" scoped>
.b-task {
  background-color: var(--color-white);
  border: none;
  border-radius: var(--unit-0100);
  display: grid;
  grid-template-areas: 'name' 'info';
  grid-row-gap: var(--unit-0300);
  padding: var(--unit-0200);

  &:hover {
    box-shadow: 0 0 0 var(--unit-0050) var(--color-accent);
  }
}

.b-task__name-wrapper {
  cursor: pointer;
  grid-area: name;
  padding: var(--unit-0200);
}

.b-task__name {
  display: -webkit-box;
  overflow: hidden;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
}

.b-task__info-wrapper {
  grid-area: info;
}

.b-task__buttons,
.b-task__info-wrapper,
.b-task__round {
  align-items: center;
  display: flex;
  justify-content: space-between;
}

.b-task__icon {
  border-radius: var(--unit-5000);
  color: var(--color-gray-30);
  height: var(--unit-0600);
  padding: var(--unit-0200);
  width: var(--unit-0600);
}

.b-task__buttons > .b-task__icon {
  cursor: pointer;

  &:hover,
  &:focus {
    background-color: var(--color-primary);
    color: var(--color-white);
  }
}

.b-task--archived {
  background-color: var(--color-gray-20);
  color: var(--color-gray-30);
}
</style>
