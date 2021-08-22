import HttpRequest from './axios'
import {
  setToken,
  getToken
} from './helper'
// import config from '@/config'
import merge from 'lodash/merge'
import {
  Message
} from 'element-ui'
const baseURL = process.env.VUE_APP_BASE_URL
const axios = new HttpRequest(baseURL)

export const fetch = (option) => {
  const token = getToken() || ''
  const axiosConfig = merge({
    method: 'post',
    headers: {
      Authorization: token,
      ChannelCode: '01',
      AcessParty: 'ycloud'
    }
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
    data: {
      plain: data
    }
  })
}

export const get = (url, data) => {
  return fetch({
    url: url,
    method: 'get'
  })
}

export const upload = (url, formData) => {
  return fetch({
    url: url,
    data: formData,
    headers: {
      'Content-Type': 'multipart.form-data'
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
