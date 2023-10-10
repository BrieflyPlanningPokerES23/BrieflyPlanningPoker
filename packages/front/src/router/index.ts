import { createRouter, createWebHistory } from 'vue-router';

const routes = [
  {
    path: '/',
    name: 'Home',
    component: () => import('../pages/home.vue'),
    props: true,
    beforeEnter: (to, from, next) => {
      !localStorage.getItem('userToken') ? next('/signin') : next();
    },
  },
  {
    path: '/signin',
    name: 'SignIn',
    component: () => import('../pages/sign-in.vue'),
  },
  {
    path: '/signup',
    name: 'SignUp',
    component: () => import('../pages/sign-up.vue'),
  },
  {
    path: '/user-account',
    name: 'user-profile',
    component: () => import('../pages/user-profile.vue'),
    beforeEnter: (to, from, next) => {
      !localStorage.getItem('userToken') ? next('/signin') : next();
    },
  },
  {
    path: '/password_reset',
    name: 'pass-recovery-one',
    component: () => import('../pages/pass-recovery-one.vue'),
  },
  {
    path: '/confirm_reset',
    name: 'pass-recovery-two',
    component: () => import('../pages/pass-recovery-two.vue'),
    beforeEnter: (route) => {
      if (!route.query.token) {
        return false;
      }
    },
    props: (route) => {
      return { token: route.query.token };
    },
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
