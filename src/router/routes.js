import layout from '@/views/layout'
export default [
  {
    path: '/',
    component: layout,
    children: [
      {
        path: '/home',
        name: 'home',
        component: () => import('@/views/home/index.vue')
      },
      {
        path: '/article',
        name: 'article',
        component: () => import('@/views/article/index.vue')
      },
      {
        path: '/image',
        name: 'image',
        component: () => import('@/views/image/index.vue')
      },
      {
        path: '/publish',
        name: 'publish',
        component: () => import('@/views/publish/index.vue')
      },
      {
        path: '/comment',
        name: 'comment',
        component: () => import('@/views/comment/index.vue')
      },
      {
        path: '/fans',
        name: 'fans',
        component: () => import('@/views/fans/index.vue')
      },
      {
        path: '/setting',
        name: 'setting',
        component: () => import('@/views/setting/index.vue')
      }
    ]
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
