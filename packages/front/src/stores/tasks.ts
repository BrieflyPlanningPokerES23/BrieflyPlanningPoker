import { defineStore } from 'pinia';
import { squadStore } from './squads';
import { api } from '../services/api';

type Task = any;

interface State {
  enabledTasks: Task[],
  disabledTasks: Task[],
}

const squad = squadStore();

export const taskStore = defineStore('squadStore',{
  state: (): State =>( {
    enabledTasks: [],
    disabledTasks: [],
  }),
  
  actions: {
    async gatherTasks(squadId: string) {
      const { data } = await api.get(`/squads/${squadId}/tasks`);
      this.enabledTasks = data.active;
      this.disabledTasks = data.unactive;
    },

    async addTask(payload: any) {
      const id = squad.getActiveId;
      await api.post(`/squads/${id}/tasks`, payload).catch((error) => {
        throw error;
      });
      await squad.gatherSquad(id);
    },

    async disableTask(taskId: string) {
      const { data } = await api.put(`/tasks/${taskId}/deactive`).catch((error) => {
        throw error;
      });
      await squad.gatherSquad(data.id);
    },

    async deleteTask(taskId: string) {
      const { data } = await api.delete(`/tasks/${taskId}`).catch((error) => {
        throw error;
      });
      await squad.gatherSquad(data.id);
    },
  },
});
