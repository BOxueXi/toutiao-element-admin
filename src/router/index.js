import Vue from 'vue'
import VueRouter from 'vue-router'
import routes from './routes'
import config from '@/config'
import { getToken } from '@/utils/helper'
Vue.use(VueRouter)

const router = new VueRouter({
  routes
})
router.beforeEach((to, from, next) => {
  const token = getToken()
  if (to.name === '403' || to.name === '404' || to.name === '500') {
    next()
  } else if (!token && to.name !== config.loginName) {
    // 未登录，并且跳转的页面不是登录页
    next({
      name: config.loginName // 跳转到登录页
    })
  } else if (!token && to.name === config.loginName) {
    // 未登录，且跳转的页面是登录页
    next()
  } else if (token && to.name === config.loginName) {
    // 已登录，且跳转的页面是登录页
    next({
      name: config.homeName // 直接跳转到首页(homeName)
    })
  } else {
    next()
  }
})
export default router
