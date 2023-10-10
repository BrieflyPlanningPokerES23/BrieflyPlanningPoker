<template>
  <div class="b-sidebar">
    <div
      class="b-sidebar__logo-wrapper"
      @click="store.dispatch('addSquadActive', {}), $router.push({ name: 'Home' })"
    >
      <img
        class="b-sidebar__image"
        src="../assets/square-logo-80.png"
        alt="brand-logo"
      >
    </div>

    <BDivisor color="gray-30" />

    <div class="b-sidebar__squad-wrapper">
      <div class="b-sidebar__new-squad-wrapper">
        <BButton
          size="small"
          value="+"
          @click="toggleModal"
        />

        <BModal
          color="gray-30"
          :open="showModal"
        >
          <FSquad @close="toggleModal" />
        </BModal>
      </div>

      <BDivisor
        v-if="squads?.length > 0"
        color="gray-30"
      />

      <div
        v-if="squads?.length > 0"
        class="b-sidebar__squad-list"
      >
        <div
          v-for="(squad, index) in squads.slice().reverse()"
          :key="index"
          class="b-sidebar__squad"
        >
          <BButton
            size="small"
            variant="transparent"
            :value="`${index + 1}`"
            @click="store.dispatch('gatherSquad', squad.id), $router.push({ name: 'Home' })"
          />
        </div>
      </div>
    </div>

    <BDivisor color="gray-30" />

    <div
      class="b-sidebar__user-wrapper"
      @click="$router.push({ name: 'user-profile' })"
    >
      <font-awesome-icon
        class="b-sidebar__user-image"
        icon="fa-regular fa-user"
      />
    </div>
  </div>
</template>

<script lang="ts">
import { ref, computed } from 'vue';
import { useStore } from 'vuex';

import BButton from '../components/b-button.vue';
import BDivisor from '../components/b-divisor.vue';
import BModal from '../components/b-modal.vue';
import FSquad from '../forms/f-squad.vue';

export default {
  name: 'BSidebar',

  components: {
    BButton,
    BDivisor,
    BModal,
    FSquad,
  },
};
</script>

<script setup lang="ts">
const store = useStore();
const squads = computed(() => store.getters.getSquadList);

const showModal = ref(false);
const toggleModal = () => {
  showModal.value = !showModal.value;
};
</script>

<style lang="scss" scoped>
.b-sidebar {
  align-content: start;
  background-color: var(--color-black);
  display: flex;
  flex-flow: column;
  height: calc(100vh - (2 * var(--unit-0900)));
  justify-items: center;
  padding: var(--unit-0900);
  row-gap: var(--unit-0900);

  @media (max-width: 768px) {
    height: calc(100vh - (2 * var(--unit-0300)));
    padding: var(--unit-0300);
    row-gap: var(--unit-0600);
  }
}

.b-sidebar__logo-wrapper {
  cursor: pointer;
  height: calc(12 * var(--unit-0100));
  width: calc(12 * var(--unit-0100));

  @media (max-width: 768px) {
    height: calc(11 * var(--unit-0100));
    width: calc(11 * var(--unit-0100));
  }

  & .b-sidebar__image {
    height: 100%;
    width: 100%;
  }
}

.b-sidebar__new-squad-wrapper,
.b-sidebar__squad-list {
  width: var(--unit-1000);
}

.b-sidebar__squad-wrapper {
  display: flex;
  flex-flow: column;
  height: 100%;
  row-gap: var(--unit-0900);
}

.b-sidebar__squad-list {
  display: grid;
  row-gap: var(--unit-0500);
  overflow-y: scroll;
  scrollbar-width: none;

  &::-webkit-scrollbar {
    display: none;
  }

  .b-sidebar__squad {
    width: 100%;
  }
}

.b-sidebar__user-wrapper {
  color: var(--color-white);
  height: var(--unit-1000);
  margin-top: auto;
  text-align: center;
  width: var(--unit-1000);
  & .b-sidebar__user-image {
    color: inherit;
    height: 80%;
    width: 80%;
  }
  &:hover {
    cursor: pointer;
    color: var(--color-accent);
  }
}
</style>
