import { api } from '../services/api';
import { defineStore } from 'pinia';

interface State {
  userToken: string,
  userEmail: string,
  errorMessage: string,
  success: boolean,
}

export const userStore = defineStore('userStore', {
  state: (): State => ({
    userToken: JSON.parse(localStorage.getItem('userToken') ?? ''),
    userEmail: JSON.parse(localStorage.getItem('userEmail') ?? ''),
    errorMessage: '',
    success: false,
  }),
  
  actions: {
    updateUserToken(token: string) {
      this.userToken = token;
      localStorage.removeItem('userToken');
      localStorage.setItem('userToken', JSON.stringify(this.userToken));
    },
    updateUserEmail(email: string) {
      this.userEmail = email;
      localStorage.removeItem('userEmail');
      localStorage.setItem('userEmail', JSON.stringify(this.userEmail));
    },
    logout() {
      this.userToken = '';
      this.userEmail = '';
      localStorage.removeItem('userToken');
      localStorage.removeItem('userEmail');
    },

    async updateYourself(body: {oldPassword: string, newPassword: string}) {
      this.errorMessage = '';
      this.success = false;
      try {
        await api.put('user', body);
        this.success = true;
      } catch (err: any) {
        const errorMessage = err.response?.data?.message;
        if (typeof errorMessage === 'object') {
          this.errorMessage = errorMessage[0].msg;
        } else if (typeof errorMessage === 'string') {
          this.errorMessage = errorMessage;
        } else {
          this.errorMessage = 'Something went wrong.';
        }
      }
    },

    async deleteYourself() {
      await api.delete('user');
      this.logout();
    },
  },
});
