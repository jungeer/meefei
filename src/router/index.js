import { createRouter, createWebHashHistory } from 'vue-router'

const routes = [
  { path: '/', name: 'Home', component: () => import('../views/Home.vue'), meta: { title: '首页' } },
  { path: '/timeline', name: 'Timeline', component: () => import('../views/Timeline.vue'), meta: { title: '我们的时光' } },
  { path: '/about', name: 'About', component: () => import('../views/About.vue'), meta: { title: '关于我们' } },
]

const router = createRouter({
  history: createWebHashHistory(),
  routes,
})

router.afterEach((to) => {
  document.title = to.meta.title ? `${to.meta.title} · 小慧&俊哥` : '小慧&俊哥'
})

export default router
