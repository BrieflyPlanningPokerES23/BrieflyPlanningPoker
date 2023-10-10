<template>
  <div class="b-task-expanded">
    <div class="b-task-expanded__leave-wrapper">
      <BButton
        size="small"
        variant="inverted"
        value="x"
        @click="$emit('close')"
      />
    </div>

    <BText
      align="center"
      class="b-task-expanded__title"
      color="black"
      size="giant"
      tag="h1"
    >
      {{ task.task }}
    </BText>

    <BText
      align="left"
      class="b-task-expanded__wrapper"
      color="gray-30"
      size="medium"
    >
      {{ task.description }}
    </BText>

    <div
      id="comment-box"
      class="b-task-expanded__wrapper b-task-expanded__comments"
    >
      <template
        v-for="round in rounds"
        :key="round"
      >
        <BText
          align="center"
          color="gray-20"
          size="medium"
        >
          Round: {{ round }}
        </BText>

        <BDivisor color="gray-20" />

        <template
          v-for="action in task.actions"
          :key="action.date"
        >
          <BComment
            v-if="action.round === round"
            :author="action.user"
            :content="action.content"
            :date="formatDate(action.date)"
            :type="action.type"
            :hidden="action.currentRound"
          />
        </template>
      </template>
    </div>

    <div
      v-if="finished"
      class="b-task-expanded__wrapper"
    >
      <FAddComment @comment="comment" />
    </div>

    <div
      v-if="finished"
      class="b-task-expanded__wrapper"
    >
      <div class="b-task-expanded__card-container">
        <BCard
          v-for="fibo in fibonacci"
          :active="votable"
          :key="fibo"
          :value="fibo"
          @click="vote(fibo)"
        />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { useStore } from 'vuex';
import { api } from '../services/api';

import BButton from '../components/b-button.vue';
import BCard from '../components/b-card.vue';
import BComment from '../components/b-comment.vue';
import BDivisor from '../components/b-divisor.vue';
import BText from '../components/b-text.vue';

import FAddComment from '../forms/f-add-comment.vue';

export default {
  name: 'BTaskExpanded',

  components: {
    BButton,
    BCard,
    BComment,
    BDivisor,
    BText,
    FAddComment,
  },

  emits: ['close'],

  props: {
    taskId: {
      type: String,
      required: true,
    },
    squadId: {
      type: String,
      required: true,
    },
  },

  data() {
    return {
      task: {},
      rounds: [],
      fibonacci: [1, 2, 3, 5, 8, 13],
      votable: true,
      finished: false,
      actualRound: 0,
    };
  },

  computed: {
    userEmail() {
      return useStore().getters.getUserEmail;
    },

    formatDate() {
      return (date) => {
        return new Date(date).toLocaleDateString('pt-BR', { timeZone: 'America/Sao_Paulo', day: '2-digit', month: '2-digit', hour: '2-digit', minute: '2-digit' });
      };
    },
  },

  methods: {
    async vote(point) {
      if (this.votable) {
        await api.post(`/squad/${this.squadId}/task/${this.taskId}/vote`, { points: point }).catch((err) => {
          console.log(err.response.data.message);
        });
        this.load();
      }
    },

    async comment(message) {
      await api.post(`/squad/${this.squadId}/task/${this.taskId}/message`, { message: `${message}` }).catch((err) => {
        console.log(err.response.data.message);
      });
      this.load();
    },

    async load() {
      await api
        .get(`/squad/${this.squadId}/task/${this.taskId}`)
        .then((res) => {
          this.task = res.data;
          this.rounds = [...new Set(this.task.actions.map((e) => e.round))];
          this.finished = !this.task.finished;
          this.task.actions.every((x) => (this.votable = this.eligible(x)));
        })
        .catch((err) => {
          console.log(err.response.data.message);
        });
      const box = document.getElementById('comment-box');
      box.scroll({ top: box.scrollHeight, behavior: 'smooth' });
    },

    eligible(person) {
      return !(person.type === 'vote' && person.currentRound === true && person.email === this.userEmail);
    },
  },

  mounted() {
    this.userEmail;
    this.load();
  },
};
</script>

<style lang="scss" scoped>
.b-task-expanded {
  display: grid;
  position: relative;
  width: 100%;

  @media (min-width: 768px) {
    width: 880px;
  }
}

.b-task-expanded__title {
  display: -webkit-box;
  margin-top: var(--unit-0200);
  margin-left: auto;
  margin-right: auto;
  max-width: 75%;
  overflow: hidden;
  text-overflow: ellipsis;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;

  @media (min-width: 768px) {
    -webkit-line-clamp: 2;
    max-width: 85%;
  }
}

.b-task-expanded__wrapper {
  margin-top: var(--unit-0300);

  @media (min-width: 768px) {
    margin-top: var(--unit-0500);
  }
}

.b-task-expanded__comments {
  max-height: 40vh;
  overflow: auto;
}

.b-task-expanded__leave-wrapper {
  height: var(--unit-1000);
  position: absolute;
  right: 0;
  top: 0;
  width: var(--unit-1000);
}

.b-task-expanded__card-container {
  display: flex;
  justify-content: space-evenly;
}
</style>
