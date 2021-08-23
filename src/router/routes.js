export default [
  {
    path: '/',
    redirect: '/login'
  },
  {
    path: '/login',
    name: 'login',
    component: () =>
      import('@/views/login/index.vue')
  },
  {
    path: '/exception/403',
    name: '403',
    icon: 'none',
    meta: {
      hideInMenu: true
    },
    component: () =>
      import('@/views/exception/403.vue')
  },
  {
    path: '/exception/500',
    name: '500',
    icon: 'none',
    meta: {
      hideInMenu: true
    },
    component: () =>
      import('@/views/exception/500.vue')
  },
  {
    path: '/exception/404',
    name: '404',
    icon: 'none',
    meta: {
      hideInMenu: true
    },
    component: () =>
      import('@/views/exception/404.vue')
  }
]
