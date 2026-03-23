import type { RouteRecordRaw } from 'vue-router'
import Layout from '@/layout/index.vue'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'root',
    component: Layout,
    redirect: { name: 'Home' },
    children: [
      {
        path: 'home',
        name: 'Home',
        component: () => import('@/views/Home/index.vue'),
        meta: {
          title: '主页'
        }
      },
      {
        path: 'shop',
        name: 'Shop',
        component: () => import('@/views/Shop/index.vue'),
        meta: {
          title: '购买'
        }
      },
      {
        path: 'orders',
        name: 'Orders',
        component: () => import('@/views/Orders/index.vue'),
        meta: {
          title: '订单'
        }
      },
      {
        path: 'my',
        name: 'My',
        component: () => import('@/views/My/index.vue'),
        meta: {
          title: '我的',
          noCache: true
        }
      }
    ]
  },
  // 404 页面
  {
    path: '/:pathMatch(.*)*',
    name: 'NotFound',
    component: () => import('@/views/404.vue'),
    meta: {
      title: '页面未找到',
      noCache: true
    }
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('@/views/Login.vue'),
    meta: {
      title: '登录',
      noCache: true
    }
  }
]

export default routes
