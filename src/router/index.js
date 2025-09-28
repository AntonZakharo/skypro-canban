import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import SignInView from '@/views/SignInView.vue'
import SignUpView from '@/views/SignUpView.vue'
import NotFoundView from '@/views/NotFoundView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '',
      name: 'home',
      component: HomeView,
      children: [
        {
          path: '/task/add',
          component: () => import('@/views/AddTaskView.vue'),
        },
        {
          path: '/exit',
          component: () => import('@/views/ExitView.vue'),
        },
        {
          path: '/task/:id',
          component: () => import('@/views/ViewTaskView.vue'),
        },
      ],
    },
    {
      path: '/sign-in',
      component: SignInView,
    },
    {
      path: '/sign-up',
      name: 'Sign up',
      component: SignUpView,
    },
    {
      path: '/:pathMatch(.*)*',
      name: '404',
      component: NotFoundView,
    },
  ],
})

export default router
