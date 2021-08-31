import { patch, get } from '@/utils/request'

export const getUserInfo = () => {
  return patch('/mp/v1_0/user/photo')
}

export const getUserData = () => {
  return get('/mp/v1_0/user/profile')
}
