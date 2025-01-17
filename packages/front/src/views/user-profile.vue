<template>
  <div class="user-profile">
    <aside>
      <BSidebar />
    </aside>

    <BModal color="gray-30" :open="deleteAccountModal">
      <FConfirmation action="delete" message="Are you sure you want to delete your account?"
        @close="hideDeleteAccountModal" @confirm="onDelete" />
    </BModal>
    <main>
      <BContainer class="user-profile__form-container">
        <BForm @submit="onSubmit" :schema="schema">
          <BInput label="Name" name="name" type="text" />
          <BInput label="Old password" name="oldPassword" type="password" />
          <BInput label="New password" name="password" type="password" />
          <BInput label="Confirm the new password" name="confirmPassword" type="password" />

          <BText v-if="user.errorMessage" color="error" size="small" tag="div">
            {{ user.errorMessage }}
          </BText>
          <BText v-else color="success" size="small" tag="div">
            Saved.
          </BText>

          <div class="user-profile__form-buttons">
            <BButton size="medium" variant="transparent" value="Delete Account" @click="showDeleteAccountModal" />
            <BButton size="medium" type="submit" value="Save" />
          </div>
        </BForm>
      </BContainer>
    </main>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import BButton from '../components/b-button.vue';
import BContainer from '../components/b-container.vue';
import BInput from '../components/b-input.vue';
import BModal from '../components/b-modal.vue';
import BSidebar from '../components/b-sidebar.vue';
import BText from '../components/b-text.vue';
import router from '../router';
import FConfirmation from '../forms/f-confirmation.vue';
import { userStore } from '@/stores';
import BForm from '@/components/b-form.vue';
import { userSchemas } from '@briefly/apidef';
import type { z } from 'zod';

const user = userStore();
const schema = userSchemas.updateSchemaReq.omit({ email: true, enabled: true });

const deleteAccountModal = ref(false);
const showDeleteAccountModal = () => deleteAccountModal.value = true;
const hideDeleteAccountModal = () => deleteAccountModal.value = false;

async function onSubmit(data: z.infer<typeof schema>) {
  await user.updateYourself(data);
}

async function onDelete() {
  await user.deleteYourself();
  router.push('/signin');
}
</script>

<style lang="scss" scoped>
.user-profile {
  display: flex;
  min-height: 100vh;

  aside {
    max-width: 68px;
    position: fixed;

    @media (min-width: 768px) {
      max-width: 120px;
    }
  }

  main {
    flex: 1 1 0;
    display: flex;
    margin-left: 68px;

    @media (min-width: 768px) {
      margin-left: 120px;
    }
  }
}

.user-profile__form-container {
  display: block;
  margin: auto;
  width: 80%;

  @media (min-width: 768px) {
    width: 350px;
  }
}

.user-profile__form-buttons {
  display: flex;
  width: 100%;
  margin-top: calc(var(--unit-0300) * 1);
  margin-left: auto;
  margin-right: auto;
  flex-wrap: wrap-reverse;

  button+button {
    margin-bottom: var(--unit-0300);
  }

  @media (min-width: 768px) {
    flex-wrap: nowrap;
    margin-top: calc(var(--unit-1000) * 1);

    button+button {
      margin-bottom: 0;
      margin-left: var(--unit-0300);
    }
  }
}
</style>
