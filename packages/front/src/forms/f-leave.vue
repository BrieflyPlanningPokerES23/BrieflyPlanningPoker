<template>
  <div class="f-leave">
    <BText
      v-if="email"
      align="left"
      type="p"
      size="large"
    >
      Are you sure you want to remove {{ email }} from the squad?
    </BText>
    <BText
      v-else
      align="left"
      type="p"
      size="large"
    >
      Are you sure you want to leave the squad?
    </BText>
    <div class="f-leave__buttons-container">
      <BButton
        variant="transparent"
        value="no"
        @click="$emit('close')"
      />

      <BButton
        value="yes"
        @click="confirm"
      />
    </div>
  </div>
</template>

<script lang="ts">
import { useStore } from 'vuex';

import BButton from '../components/b-button.vue';
import BText from '../components/b-text.vue';

export default {
  name: 'FLeave',

  components: {
    BButton,
    BText,
  },
};
</script>

<script setup lang="ts">
const emit = defineEmits(['close']);
const store = useStore();
const props = defineProps({
  email: {
    type: String,
    default: undefined,
  },
});

function confirm() {
  if (props.email) {
    store.dispatch('delUser', props.email);
  } else {
    store.dispatch('delYourself');
  }

  emit('close');
}
</script>

<style lang="scss" scoped>
.f-leave {
  display: grid;
  margin-top: calc(var(--unit-0200) * -1);
  min-width: 280px;
  row-gap: var(--unit-0500);
  width: min-content;
}

.f-leave__buttons-container {
  display: flex;
  gap: var(--unit-1000);
  width: 100%;
}
</style>
