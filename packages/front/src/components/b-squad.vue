<template>
  <div class="b-squad">
    <div class="b-squad__container">
      <div class="b-squad__name">
        <BText
          class="b-squad__title"
          color="white"
          size="giant"
          @click="toggleUpdateModal"
        >
          {{ squad.squad }}
        </BText>
      </div>

      <BDivisor
        class="b-squad__divisor"
        color="black"
      />

      <div class="b-squad__info">
        <div class="b-squad__max-rounds">
          <font-awesome-icon
            class="b-squad__icon"
            icon="fa-solid fa-arrow-rotate-right"
          />

          <BText
            color="white"
            size="giant"
          >
            {{ squad.currentMaxRounds }}
          </BText>
        </div>

        <div class="b-squad__percentual">
          <font-awesome-icon
            class="b-squad__icon"
            icon="fa-solid fa-user-check"
          />

          <BText
            color="white"
            size="giant"
          >
            {{ squad.currentPercentual }}
          </BText>
        </div>
        <div
          class="b-squad__leave"
          @click="toggleLeaveModal('')"
        >
          <font-awesome-icon
            class="b-squad__icon"
            icon="fa-solid fa-right-from-bracket"
          />

          <BText
            color="white"
            size="giant"
          >
            Sair
          </BText>
        </div>
      </div>
    </div>

    <div v-if="moreInfo">
      <FAddUser />

      <div class="b-squad__users-container">
        <BBadge
          v-for="(user, index) in squad.users.filter((x) => x.email !== actualUser)"
          :key="index"
          @action="toggleLeaveModal(user.email)"
        >
          {{ user.email }}
        </BBadge>
      </div>
    </div>

    <BDivisor
      v-if="squad.squad"
      :button="true"
      color="primary"
      @action="toggleInfo"
    />
  </div>

  <BModal
    color="gray-30"
    :open="updateModal"
  >
    <FSquad
      :update="true"
      @close="toggleUpdateModal"
    />
  </BModal>

  <BModal
    color="gray-30"
    :open="leaveModal"
  >
    <FLeave
      :email="email"
      @close="toggleLeaveModal('')"
    />
  </BModal>
</template>

<script lang="ts">
import { ref, computed } from 'vue';
import { useStore } from 'vuex';

import BBadge from '../components/b-badge.vue';
import BDivisor from '../components/b-divisor.vue';
import BModal from '../components/b-modal.vue';
import BText from '../components/b-text.vue';

import FAddUser from '../forms/f-add-user.vue';
import FLeave from '../forms/f-leave.vue';
import FSquad from '../forms/f-squad.vue';

export default {
  name: 'BSquad',

  components: {
    BBadge,
    BDivisor,
    BModal,
    BText,
    FAddUser,
    FLeave,
    FSquad,
  },

  props: {
    squad: {
      type: Object,
      required: true,
    },
  },
};
</script>

<script setup lang="ts">
const store = useStore();
const actualUser = computed(() => store.getters.getUserEmail);

const moreInfo = ref(false);
const toggleInfo = () => {
  moreInfo.value = !moreInfo.value;
};

const updateModal = ref(false);
const toggleUpdateModal = () => {
  updateModal.value = !updateModal.value;
};

const email = ref(String);
const leaveModal = ref(false);
const toggleLeaveModal = (user) => {
  (email.value = user), (leaveModal.value = !leaveModal.value);
};
</script>

<style lang="scss" scoped>
.b-squad {
  display: grid;
  row-gap: var(--unit-0900);

  @media (max-width: 768px) {
    row-gap: var(--unit-0600);
  }
}

.b-squad__container {
  align-items: center;
  display: grid;
  grid-template-areas: 'name info';
  grid-template-columns: 1fr min-content;

  @media (max-width: 768px) {
    grid-template-areas: 'name' 'divisor' 'info';
    row-gap: var(--unit-0600);
  }
}

.b-squad__name,
.b-squad__info,
.b-squad__max-rounds,
.b-squad__percentual,
.b-squad__leave {
  align-items: center;
  display: flex;
}

.b-squad__name {
  grid-area: name;
  height: 48px;

  @media (max-width: 768px) {
    height: 44px;
  }
}

.b-squad__title {
  cursor: pointer;
  display: -webkit-box;
  overflow: hidden;
  text-overflow: ellipsis;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;

  &:hover {
    color: var(--color-accent);
  }
}

.b-squad__divisor {
  grid-area: divisor;

  @media (min-width: 768px) {
    display: none;
  }
}

.b-squad__info {
  cursor: default;
  grid-area: info;
  height: var(--unit-1000);
  justify-content: space-between;

  @media (min-width: 768px) {
    width: 280px;
  }
}

.b-squad__max-rounds,
.b-squad__percentual,
.b-squad__leave {
  column-gap: var(--unit-0200);
}

.b-squad__leave {
  cursor: pointer;

  &:hover {
    & > svg,
    span {
      color: var(--color-accent);
    }
  }
}

.b-squad__icon {
  color: var(--color-white);
  height: var(--unit-0500);
}

.b-squad__users-container {
  column-gap: var(--unit-0400);
  display: flex;
  flex-wrap: wrap;
  margin-top: var(--unit-0100);
  row-gap: var(--unit-0200);
}
</style>
