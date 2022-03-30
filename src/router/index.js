import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
        path: '/comments',
        name: 'comment',
        component: () => import('../views/comments/index.vue')
    },
    {
        path: '/',
        redirect: '/comments',
    }
  ]
})

export default router
