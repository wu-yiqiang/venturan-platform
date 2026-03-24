import {
  createRouter,
  createWebHistory
} from 'vue-router'
import routes from './routes'
import { useSysStore } from '@/store/modules/sysStore'

const router = createRouter({
  history: createWebHistory('/jxshop'),
  routes
})

router.beforeEach((to, _from, next) => {
  const sysStore = useSysStore()
  const userInfos = sysStore.userInfos as any
  sysStore.setBottomTab(to?.meta?.bottomTab as boolean)
  if (to.path === '/login') {
    next()
  } else if (!userInfos?.token) {
    next('/login')
  } else {
    next()
  }
})

export default router
