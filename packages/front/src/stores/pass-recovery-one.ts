import { api } from '../services/api';
import router from '../router/index';
import { defineStore } from 'pinia'

const envVars = import.meta.env;

interface State {
  email: string,
  errorMessage: string,
};

export const passRecoveryOneStore = defineStore('passRecoveryOne', {
  state: (): State => ({
    email: '',
    errorMessage: '',
  }),

  actions: {
    recovery() {
      api.post('user/pass-recovery', {
          email: this.email,
          url: `${envVars.DEV ? envVars.VITE_DEV_WEB_URL : envVars.VITE_PROD_WEB_URL}confirm_reset?token=` })
        .then(() => {
          router.push('/signin');
        })
        .catch((err) => {
          this.errorMessage = err.response.data.message;
        });
    },
  }
});
