import { api } from '../services/api';
import router from '../router/index';
import { defineStore } from 'pinia';
import { userStore } from './user';

interface State {
  confirmPassword: string,
  email: string,
  errorMessage: string,
  name: string,
  password: string
};

const user = userStore();

export const signUpStore = defineStore('signUpStore', {
  state: (): State => ({
    confirmPassword: '',
    email: '',
    errorMessage: '',
    name: '',
    password: '',
  }),
  
  actions: {
    register() {
      api.post('users', { name: this.name, email: this.email, password: this.password })
        .then(({data}) => {
          const token = data.token;
          user.updateUserToken(token);
          user.updateUserEmail(this.email);
          router.push('/');
        })
        .catch((err: any) => {
          this.errorMessage = err.response.data.message;
        });
    },
  }
});
