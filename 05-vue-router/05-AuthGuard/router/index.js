import { createRouter, createWebHistory } from 'vue-router';
import { isAuthenticated } from '../services/authService.js';

const router = createRouter({
  history: createWebHistory('/05-vue-router/05-AuthGuard'),
  routes: [
    {
      path: '/',
      alias: '/meetups',
      component: () => import('../views/PageMeetups.vue'),
    },
    {
      path: '/login',
      meta: {
        requireGuest: true,
      },
      component: () => import('../views/PageLogin.vue'),
    },
    {
      path: '/register',
      meta: {
        requireGuest: true,
      },
      component: () => import('../views/PageRegister.vue'),
    },
    {
      path: '/meetups/create',
      meta: {
        requireAuth: true,
      },
      component: () => import('../views/PageCreateMeetup.vue'),
    },
    {
      path: '/meetups/:meetupId(\\d+)/edit',
      meta: {
        requireAuth: true,
      },
      component: () => import('../views/PageEditMeetup.vue'),
    },
  ],
});

router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requireGuest)) {
    if (isAuthenticated()) {
      next({ path: '/' });
    } else {
      next();
    }
  } else if (to.matched.some(record => record.meta.requireAuth)) {
    if (isAuthenticated()) {
      next();
    } else {
      next({
        path: '/login',
        query: { from: to.fullPath },
      });
    }
  } else {
    next();
  }
});

export { router };
