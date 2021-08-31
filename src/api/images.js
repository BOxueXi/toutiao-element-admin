import { get, upload, fetch } from '@/utils/request'
// 上传
export const uploadImg = (data) => {
  return upload('/mp/v1_0/user/images', data)
}

// 列表
export const imgList = (data) => {
  return get('/mp/v1_0/user/images', data)
}

// 是否收藏 data:{collect: true|false}
export const collectImg = (id, data) => {
  return fetch({
    url: '/mp/v1_0/user/images/' + id,
    method: 'put',
    data
  })
}

// 删除
export const imgDel = (id) => {
  return fetch({
    url: '/mp/v1_0/user/images/' + id,
    method: 'delete'
  })
}
