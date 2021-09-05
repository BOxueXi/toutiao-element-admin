import { fetch } from '@/utils/request'
//
export const followersList = (params) => {
  return fetch({
    url: '/mp/v1_0/followers',
    method: 'get',
    params
  })
}
