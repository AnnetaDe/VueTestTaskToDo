import { createRouter, createWebHistory } from 'vue-router'

const HomePage = () => import('../views/HomePage.vue')
const FavoritePage = () => import('../views/FavoritePage.vue')
const DonePage = () => import('../views/DonePage.vue')
const routes = [
  {
    path: '/',
    name: 'HomePage',
    component: HomePage,
    props: (route) => ({ filter: route.query.filter })
  }
]

export const router = createRouter({
  history: createWebHistory(),
  routes
})
