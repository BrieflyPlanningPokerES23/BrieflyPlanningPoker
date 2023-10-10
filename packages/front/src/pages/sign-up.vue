<template>
  <div class="sign-up">
    <BBrand />

    <BContainer color="gray-30">
      <Form
        class="sign-up__form"
        :validation-schema="schema"
        @submit="onSubmit"
        @invalid-submit="onInvalidSubmit"
      >
        <BInputField
          label="Name"
          name="name"
        >
          <BInput
            name="name"
            type="text"
            @input="updateName"
          />
        </BInputField>

        <BInputField
          label="E-mail"
          name="email"
        >
          <BInput
            name="email"
            type="email"
            @input="updateEmail"
          />
        </BInputField>

        <BInputField
          label="Password"
          name="password"
        >
          <BInput
            name="password"
            type="password"
            @input="updatePassword"
          />
        </BInputField>

        <BInputField
          label="Confirm password"
          name="confirmPassword"
        >
          <BInput
            name="confirmPassword"
            type="password"
            @input="updateConfirmPassword"
          />
        </BInputField>

        <BText
          class="error"
          size="small"
          tag="div"
        >
          {{ errorMessage }}
        </BText>

        <div class="sign-up__buttons-container">
          <BButton
            variant="transparent"
            value="return"
            @click="$router.push('signin')"
          />

          <BButton
            class="sign-up__create-button"
            type="submit"
            value="create"
          />
        </div>
      </Form>
    </BContainer>

    <BText
      class="sign-up__terms"
      size="small"
      tag="p"
    >
      By creating an account, you agree to the <a href="#">Terms of Service</a>.
    </BText>
  </div>
</template>

<script lang="ts">
import { Form } from 'vee-validate';
import * as Yup from 'yup';
import BBrand from '../components/b-brand.vue';
import BButton from '../components/b-button.vue';
import BContainer from '../components/b-container.vue';
import BInput from '../components/b-input.vue';
import BInputField from '../components/b-input-field.vue';
import BText from '../components/b-text.vue';
import {signUpStore} from '../stores';
import { computed } from 'vue';
import { createSchema } from '@briefly/prisma/dist/apiSchemas/users';
import { toTypedSchema } from '@vee-validate/zod';
import { z } from 'zod';

const signUp = signUpStore();

const usersCreateSchema = createSchema
  .omit({enabled: true})
  .extend({
    confirmPassword: z.string()
  });
  // .refine((obj) => obj.password == obj.confirmPassword, {
  //   message: 'Passwords dont match!'
  // });

export default {
  name: 'SignUp',

  components: {
    BBrand,
    BButton,
    BContainer,
    BInput,
    BInputField,
    BText,
    Form,
  },

  setup() {
    function onSubmit() {
      signUp.register();
    }

    function onInvalidSubmit() {
      const submitButton = document.querySelector('.sign-up__create-button');

      submitButton!.classList.add('invalid');
      setTimeout(() => {
        submitButton!.classList.remove('invalid');
      }, 1000);
    }

    function updateName(e: any) {
      signUp.name = e.target.value;
    }

    function updateEmail(e: any) {
      signUp.email = e.target.value;
    }

    function updatePassword(e: any) {
      signUp.password = e.target.value;
    }

    function updateConfirmPassword(e: any) {
      signUp.confirmPassword = e.target.value;
    }

    const myschema = Yup.object().shape({
      name: Yup.string().max(55).required(),
      email: Yup.string().email().required(),
      password: Yup.string().min(6).trim().required(),
      confirmPassword: Yup.string()
        .oneOf([Yup.ref('password')], 'passwords do not match')
        .required(),
    });

    const errorMessage = computed(() => signUp.errorMessage);

    return { onSubmit,
      onInvalidSubmit,
      updateName,
      updateEmail,
      updatePassword,
      updateConfirmPassword,
      errorMessage };
  },
};
</script>

<style scoped lang="scss">
.sign-up {
  align-content: center;
  background-color: var(--color-black);
  display: grid;
  justify-items: center;
  min-height: 100vh;
  row-gap: var(--unit-1000);
}

.sign-up__form {
  display: grid;
  margin-top: calc(var(--unit-0200) * -1);
  row-gap: var(--unit-0200);
  width: 280px;
}

.sign-up__buttons-container {
  display: flex;
  gap: var(--unit-1000);
  width: 100%;
}

.sign-up__terms {
  color: var(--color-white);
  margin-top: var(--unit-0200);
}
</style>
