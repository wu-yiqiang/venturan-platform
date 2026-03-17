import {
  createRouter,
  createWebHistory
} from 'vue-router'
import setPageTitle from '@/utils/set-page-title'
import routes from './routes'
import { useSysStore } from '@/store/modules/sysStore'

const router = createRouter({
  history: createWebHistory('/jxshop'),
  routes
})

router.beforeEach((to, _from, next) => {
  const sysStore = useSysStore()
  const userInfos = sysStore.userInfos
  console.log('tototo', sysStore.userInfos)
  if (to.path === '/login') {
    next()
  }else if (!userInfos?.token) {
    next('/login')
  }
  next()
})

export default router
