import Cookies from 'js-cookie'
import config from '@/config'

const {
  cookieExpires
} = config

export const TOKEN_KEY = 'token'
export const ROUTES_KEY = 'routes'

export const setToken = (token) => {
  token = token || ''
  Cookies.set(TOKEN_KEY, token, {
    expires: cookieExpires || 1
  })
}

export const getToken = () => {
  const token = Cookies.get(TOKEN_KEY)
  if (token) {
    return token
  } else {
    return false
  }
}

export const setRoutes = (routes) => {
  Cookies.set(ROUTES_KEY, JSON.stringify(routes))
}

export const getRoutes = () => {
  let routes = Cookies.get(ROUTES_KEY)
  if (routes) {
    routes = JSON.parse(routes)
  } else {
    routes = []
  }
  if (routes.length > 0) {
    return routes
  } else {
    return false
  }
}

export const transferRoutes = (menus) => {
  menus.filter((item) => {
    item.path = item.url
    item.name = item.permission
    // item.component = item.component
    item.meta = {
      icon: item.icon,
      title: item.menuName
    }
    if (item.child && item.child.length) {
      item.children = transferRoutes(item.child)
    }
  })
  return menus
}
