import { api } from '../services/api';
import router from '../router/index';
import { defineStore } from 'pinia';

interface State {
  confirmPassword: string,
  errorMessage: string,
  newPassword: string
};

export const passRecoveryTwoStore = defineStore('passRecoveryTwo', {
  state: (): State => ({
    confirmPassword: '',
    errorMessage: '',
    newPassword: '',
  }),

  actions: {
    update(token: string) {
      api.patch('user/pass-recovery', { password: this.newPassword, token })
        .then(() => {
          router.push('/signin');
        })
        .catch((err) => {
          this.errorMessage = err.response.data.message;
        });
    }
  }
});
