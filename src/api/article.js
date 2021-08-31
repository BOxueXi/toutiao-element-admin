import {
  get,
  deleteMethod,
  fetch
} from '@/utils/request'
// 列表
export const getArticleList = (data) => {
  return get('/mp/v1_0/articles', data)
}
// 获取频道
export const getChannels = (data) => {
  return get('/mp/v1_0/channels', data)
}
// 删除
export const articleDel = (id) => {
  return deleteMethod('/mp/v1_0/articles/' + id)
}
// 新增  draft:false 发表，true存入草稿
export const addArticle = (draft, data) => {
  return fetch({
    url: '/mp/v1_0/articles',
    method: 'post',
    params: {
      draft
    },
    data
  })
}

// 获取文章的数据  draft:false 发表，true存入草稿
export const articleInfo = (id) => {
  return fetch({
    url: '/mp/v1_0/articles/' + id,
    method: 'get'
  })
}

// 修改文章的数据  draft:false 发表，true存入草稿
export const editArticle = (draft, data, id) => {
  return fetch({
    url: '/mp/v1_0/articles/' + id,
    method: 'put',
    params: {
      draft
    },
    data
  })
}
