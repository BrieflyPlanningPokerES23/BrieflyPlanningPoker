import { defineStore } from 'pinia';

import { api } from '../services/api';
import router from '../router/index';
import { userStore } from './user';

interface State {
  email: string,
  errorMessage: string,
  password: string,
}

const user = userStore();

export const signInStore = defineStore('signInStore', {
  state: (): State => ({
    email: '',
    errorMessage: '',
    password: '',
  }),
  
  actions: {
    async login() {
      await api
        .post('users/login', { email: this.email, password: this.password })
        .then(({data}) => {
          const token = data.token;
          user.updateUserToken(token);
          user.updateUserEmail(this.email);
          router.push('/');
        })
        .catch((err) => {
          this.errorMessage = err.response.data.message;
        });
    },
  },
});
