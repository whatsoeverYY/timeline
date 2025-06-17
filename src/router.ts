import { createRouter, createWebHistory, type RouteRecordRaw } from 'vue-router'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'Home',
    component: () => import('./components/theme-merry/Container.vue'),
  },
  {
    path: '/about',
    name: 'About',
    component: () => import('./components/About.vue'),
  },
  {
    path: '/compress',
    name: 'Compress',
    component: () => import('./components/ImageCompress.vue'),
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router
