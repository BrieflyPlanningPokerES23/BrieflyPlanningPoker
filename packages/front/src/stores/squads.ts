import { defineStore } from 'pinia';
import { api } from '../services/api';
import router from '../router';
import { userStore } from './user';

interface State {
  squadList: [],
  squadActive: { id?: string } & {[k: string]: any},
}

const user = userStore();

export const squadStore = defineStore('squadStore',{
  state: (): State => ({
    squadList: [],
    squadActive: {},
  }),

  getters: {
    getActiveId(): string {
      return this.squadActive.id ?? '';
    },
  },
  
  actions: {
    async gatherSquadList() {
      await api
        .get('squads')
        .then(({data}) => {
          return this.squadList = data;
        })
        .catch(() => {
          return router.push('signin');
        });
    },

    async gatherSquad(id: string) {
      const { data } = await api.get(`squads/${id}`);
      this.squadActive = data;
    },

    async addUser(email: string) {
      const id = this.getActiveId;
      await api.post(`squads/${id}/users`, { email, owner: true }).catch((error) => {
        throw error;
      });
      await this.gatherSquad(id);
    },

    async addYourself(id: string) {
      const email = user.userEmail;
      await api.post(`squads/${id}/users`, { email, owner: true }).catch((error) => {
        throw error;
      });
      await this.gatherSquad(id);
    },

    async delUser(email: string) {
      const id = this.getActiveId;
      await api.delete(`squads/${id}/users?email=${email}`).catch((error) => {
        throw error;
      });
      await this.gatherSquad(id);
    },

    async delYourself() {
      const id = this.getActiveId;
      const email = user.userEmail;
      await api.delete(`squads/${id}/users?email=${email}`).catch((error) => {
        throw error;
      });
      await this.gatherSquadList();
      this.squadActive = {};
    },

    async addSquad(payload: any) {
      const { data } = await api.post('squads', payload).catch((error) => {
        throw error;
      });
      const id = data.id;
      await this.addYourself(id);
      await this.gatherSquadList();
    },

    async updateSquad(payload: any) {
      const id = this.getActiveId;
      await api.put(`squads/${id}`, payload).catch((error) => {
        throw error;
      });
      await this.gatherSquad(id);
    }
  },
});
