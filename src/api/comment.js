import {
  get,
  fetch
} from '@/utils/request'
// 列表
export const getCommentList = (data) => {
  return get('/mp/v1_0/articles', data)
}
// 打开关闭评论
export const commentOpenOrClose = (params, data) => {
  return fetch({
    url: '/mp/v1_0/comments/status',
    method: 'put',
    params,
    data
  })
}
