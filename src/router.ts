import { createRouter, createWebHistory, type RouteRecordRaw } from 'vue-router'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'Home',
    component: () => import('./components/ThemeContainer.vue'),
  },
  {
    path: '/about',
    name: 'About',
    component: () => import('./pages/About.vue'),
  },
  {
    path: '/compress',
    name: 'Compress',
    component: () => import('./pages/ImageCompress.vue'),
  },
  {
    path: '/ai',
    name: 'AICaption',
    component: () => import('./pages/AICaption.vue'),
  },
  {
    path: '/all',
    name: 'AllPhotos',
    component: () => import('./pages/AllPhotos.vue'),
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router
