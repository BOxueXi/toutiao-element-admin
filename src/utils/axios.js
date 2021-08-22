import axios from 'axios'
class HttpRequest {
  constructor (baseURL) {
    this.baseURL = baseURL
    this.queue = {}
  }

  getConfig () {
    const config = {
      baseURL: this.baseURL,
      headers: {}
    }
    return config
  }

  destroy (url) {
    delete this.queue[url]
    if (!Object.keys(this.queue).length) {
      // 请求都完成
    }
  }

  interceptors (instance, url) {
    // 添加请求拦截器
    instance.interceptors.request.use((config) => {
      // 在发送请求之前做些什么
      if (!Object.keys(this.queue).length) {
        // 请求都完成
      }
      this.queue[url] = true
      return config
    }, error => {
      // 对请求错误做些什么
      return Promise.reject(error)
    })
    // 添加响应拦截器
    instance.interceptors.response.use(res => {
      // 对响应数据做点什么
      this.destroy(url)
      const {
        data,
        status,
        headers
      } = res
      return {
        data,
        status,
        headers
      }
    }, error => {
      // 对响应错误做点什么
      this.destroy(url)
      let errorInfo = error.response
      console.log(error)
      if (!errorInfo) {
        const {
          request: {
            statusText,
            status
          },
          config
        } = JSON.parse(JSON.stringify(error))
        errorInfo = {
          statusText,
          status,
          request: {
            responseURL: config.url
          }
        }
      }
      return Promise.reject(errorInfo)
    })
  }

  request (option) {
    const instance = axios.create()
    option = Object.assign(this.getConfig(), option)
    this.interceptors(instance, option.url)
    return instance(option)
  }
}

export default HttpRequest
