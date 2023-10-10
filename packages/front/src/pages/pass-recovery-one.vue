<template>
  <div class="pass-recovery-one">
    <BBrand />

    <BContainer color="gray-30">
      <Form
        class="pass-recovery-one__form"
        :validation-schema="schema"
        @submit="onSubmit"
        @invalid-submit="onInvalidSubmit"
      >
        <BInputField
          label="Enter your e-mail address and we will send you a password reset link"
          name="email"
        >
          <BInput
            name="email"
            type="email"
            @input="updateEmail"
          />
        </BInputField>

        <BText
          class="error"
          size="small"
          tag="div"
        >
          {{ errorMessage }}
        </BText>

        <div class="pass-recovery-one__buttons-container">
          <BButton
            variant="transparent"
            value="return"
            @click="$router.push('signin')"
          />

          <BButton
            class="pass-recovery-one__send-button"
            type="submit"
            value="send"
          />
        </div>
      </Form>
    </BContainer>
  </div>
</template>

<script lang="ts">
import { Form } from 'vee-validate';
import * as Yup from 'yup';
import BBrand from './../components/b-brand.vue';
import BButton from './../components/b-button.vue';
import BContainer from './../components/b-container.vue';
import BInput from './../components/b-input.vue';
import BInputField from '../components/b-input-field.vue';
import BText from '../components/b-text.vue';
import { passRecoveryOneStore } from '../stores';
import { computed, defineComponent } from 'vue';

const pStore = passRecoveryOneStore();

export default defineComponent({
  name: 'PassRecoveryOne',
  
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
      pStore.recovery();
    }

    function onInvalidSubmit() {
      const submitButton = document.querySelector('.pass-recovery-one__send-button');

      submitButton!.classList.add('invalid');
      setTimeout(() => {
        submitButton!.classList.remove('invalid');
      }, 1000);
    }

    function updateEmail(e:any) {
      pStore.email = e.target.value;
    }

    const schema = Yup.object().shape({
      email: Yup.string().email().required(),
    });

    const errorMessage = computed(() => pStore.errorMessage);

    return { onSubmit, onInvalidSubmit, updateEmail, schema, errorMessage };
  },
});
</script>

<style scoped lang="scss">
.pass-recovery-one {
  align-content: center;
  background-color: var(--color-black);
  display: grid;
  justify-items: center;
  min-height: 100vh;
  row-gap: var(--unit-1000);
}

.pass-recovery-one__form {
  display: grid;
  margin-top: calc(var(--unit-0200) * -1);
  row-gap: var(--unit-0200);
  width: 280px;
}

.pass-recovery-one__buttons-container {
  display: flex;
  gap: var(--unit-1000);
  width: 100%;
}
</style>
