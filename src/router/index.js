import Vue from 'vue'
import VueRouter from 'vue-router'
// import Login from '@/views/login'

Vue.use(VueRouter)

const routes = [
  {
    name: 'LoginPage',
    path: '/login',
    component: () => import('@/views/login')
  },
  {
    path: '/',
    component: () => import('@/views/tab-bar'),
    children: [
      {
        path: '',
        name: 'home',
        component: () => import('@/views/home')
      },
      {
        path: 'qa',
        name: 'qa',
        component: () => import('@/views/questionAndAnswer')
      },
      {
        path: 'video',
        name: 'video',
        component: () => import('@/views/video')
      },
      {
        path: 'my',
        name: 'my',
        component: () => import('@/views/my')
      }
    ]
  },
  {
    path: '/user/:userId',
    name: 'user',
    component: () => import('@/views/user')
  },
  {
    path: '/search',
    name: 'search',
    component: () => import('@/views/search')
  }
]

const router = new VueRouter({
  routes
})

export default router
