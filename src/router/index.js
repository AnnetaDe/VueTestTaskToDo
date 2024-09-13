import { createRouter, createWebHistory } from 'vue-router'

const HomePage = () => import('../views/HomePage.vue')
const WellcomePage = () => import('../views/WellcomePage.vue')
const FavoritePage = () => import('../views/FavoritePage.vue')
const DonePage = () => import('../views/DonePage.vue')

const routes = [
  { path: '/', component: WellcomePage },
  {
    path: '/tasks',
    component: HomePage,
    children: [
      { path: '/favorite', component: FavoritePage },
      { path: '/done', component: DonePage }
    ]
  }
]

export const router = createRouter({
  history: createWebHistory(),
  routes
})
