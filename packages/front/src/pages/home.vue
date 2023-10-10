<template>
  <div class="home">
    <aside>
      <BSidebar />
    </aside>

    <main v-if="squad.id">
      <div class="home__section">
        <BSquad :squad="squad" />
      </div>

      <div class="home__section">
        <BTaskContainer
          title="Active"
          :active="true"
          :tasks="activeTasks"
        />
      </div>

      <div class="home__section">
        <BTaskContainer
          title="Archived"
          :active="false"
          :tasks="archivedTasks"
        />
      </div>
    </main>

    <main
      v-else
      class="home__blank"
    >
      <BText
        color="gray-30"
        size="giant"
      >
        Hey, welcome! Let's poker... (╯°□°)╯︵ ┻━┻
      </BText>
    </main>
  </div>
</template>

<script lang="ts">
import { computed, onMounted } from 'vue';

import BSidebar from '../components/b-sidebar.vue';
import BSquad from '../components/b-squad.vue';
import BTaskContainer from '../components/b-task-container.vue';
import BText from '../components/b-text.vue';
import { squadStore, taskStore } from '../stores';

export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: 'Home',

  components: {
    BSidebar,
    BSquad,
    BTaskContainer,
    BText,
  },
};
</script>

<script setup lang="ts">

const squadS = squadStore();
const taskS = taskStore();

const squad = computed(() => {
  const req = squadS.squadActive;

  if (req.id)
    taskS.gatherTasks(req.id);

  return req;
});

const activeTasks = computed(() => taskS.enabledTasks);

const archivedTasks = computed(() => taskS.disabledTasks);

onMounted(() => squadS.gatherSquadList());
</script>

<style lang="scss" scoped>
.home {
  display: flex;

  aside {
    max-width: 68px;
    position: fixed;

    @media (min-width: 768px) {
      max-width: 120px;
    }
  }

  main {
    flex: 1 1 0;
    margin-left: 68px;

    @media (min-width: 768px) {
      margin-left: 120px;
    }
  }
}

.home__section {
  margin-top: var(--unit-0500);
  padding: var(--unit-0300);

  @media (min-width: 768px) {
    padding: var(--unit-0900);
  }

  &:first-child {
    margin-top: var(--unit-0000);
  }
}

.home__blank {
  align-items: center;
  border-left: var(--unit-0050) solid var(--color-gray-30);
  background-color: var(--color-black);
  display: flex;
  height: 100vh;
  justify-content: center;
  width: 100%;
}
</style>
