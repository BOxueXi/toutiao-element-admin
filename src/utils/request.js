import HttpRequest from './axios'
import {
  setToken,
  getToken
} from './helper'
// import config from '@/config'
import merge from 'lodash/merge'
import jsonBig from 'json-bigint' // 处理数字类型超出完全范围
import {
  Message
} from 'element-ui'
import { transferData } from '@/utils/tools'
const baseURL = process.env.VUE_APP_BASE_URL
const axios = new HttpRequest(baseURL)

export const fetch = (option) => {
  const token = getToken() || ''
  const axiosConfig = merge({
    method: 'post',
    headers: {
      Authorization: 'Bearer ' + token,
      ChannelCode: '01',
      AcessParty: 'ycloud'
    },
    transformResponse: [function (data) { // 处理后台返回的原始数据， axios内部默认使用JSON.parse()处理后台返回的数据
      // 对 data 进行任意转换处理
      try {
        // 作用1：把json字符串转为js对象
        // 作用2：把里面的大数字做安全处理
        return jsonBig.parse(data)
      } catch (e) {
        return data
      }
    }]
  }, option)
  return new Promise((resolve, reject) => {
    axios.request(axiosConfig).then(res => {
      if (res.headers.authorization && res.headers.authorization !== token) {
        setToken(res.headers.authorization)
      }
      let data = res.data.plain || {}
      if (!res.data.plain) {
        data = res.data
      }
      if (data.resultCode === '000' || !data.resultCode) {
        resolve(data)
      } else if (data.resultCode === '402') {
        setToken()
        window.location.href = '/#/login'
        Message.error('登录状态已过期')
      } else if (data.resultCode === '401') {
        window.location.href = '/#/exception/403'
      } else if (data.resultCode === '404') {
        window.location.href = '/#/exception/404'
      } else if (data.resultCode === '500') {
        window.location.href = '/#/exception/500'
      } else {
        reject(data)
        if (data.resultMsg) {
          Message.error(data.resultMsg)
        } else {
          Message.error('请求报错，请重试')
        }
      }
    }).catch(err => {
      reject(err)
      Message.error('请求失败，请重试')
    })
  })
}
export const post = (url, data) => {
  return fetch({
    url: url,
    // data: {
    //   plain: data
    // }
    data
  })
}

export const get = (url, data) => {
  data = transferData(data)
  return fetch({
    url: url,
    method: 'get',
    params: data
  })
}
export const deleteMethod = (url, data) => {
  data = transferData(data)
  return fetch({
    url: url,
    method: 'delete',
    params: data
  })
}

export const patch = (url, data) => {
  return fetch({
    url: url,
    method: 'patch'
  })
}

export const upload = (url, formData) => {
  return fetch({
    url: url,
    data: formData,
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  })
}

export const download = (url, data) => {
  return fetch({
    url: url,
    params: data,
    responseType: 'blob'
  })
}

export const downPost = (url, data) => {
  return fetch({
    url: url,
    data: {
      plain: data
    },
    responseType: 'blob'
  })
}
