import { createRouter, createWebHistory } from 'vue-router'

const HomePage = () => import('../views/HomePage.vue')

const routes = [
  {
    path: '/:filter?',
    component: HomePage,
    meta: {
      transition: 'fade'
    }
  }
]

export const router = createRouter({
  history: createWebHistory(),
  routes
})
