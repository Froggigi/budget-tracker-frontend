import { createRouter, createWebHistory } from 'vue-router'
import Login from '../components/Login.vue'
import Records from '../components/Records.vue'

const routes = [
  {
    path: '/',
    component: Login
  },
  {
    path: '/records',
    component: Records
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
