import { patch, get, fetch } from '@/utils/request'

export const getUserInfo = () => {
  return patch('/mp/v1_0/user/photo')
}

export const getUserData = () => {
  return get('/mp/v1_0/user/profile')
}

// 修改用户头像
export const updateUserImg = (data) => {
  return fetch({
    method: 'patch',
    url: '/mp/v1_0/user/photo',
    headers: {
      'Content-Type': 'multipart/form-data'
    },
    data
  })
}

// 修改用户
export const editUser = (data) => {
  return fetch({
    method: 'patch',
    url: '/mp/v1_0/user/profile',
    data
  })
}
