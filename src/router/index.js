import { createRouter, createWebHistory } from 'vue-router'
import Login from '../components/Login.vue'
import Records from '../components/Records.vue'

const routes = [
  {
    path: "/",
    redirect: '/login'
  },
  {
    path: '/login',
    name: 'Login',
    component: Login
  },
  {
    path: '/records',
    name: 'Records',
    component: Records
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
