import { patch } from '@/utils/request'

export const getUserInfo = () => {
  return patch('/mp/v1_0/user/photo')
}
