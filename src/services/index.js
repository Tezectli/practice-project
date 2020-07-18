/* 封装get、post等请求 
@author: 陈伟润
@date: 2019/7/11
*/
import axios from './axios'

let instance = axios()
export default {
  get(url, params, headers) {
    let options = {}

    if (params) {
      options.params = params
    }
    if (headers) {
      options.headers = headers
    }
    return instance.get(url, options)
  },
  post(url,params,headers,data) {
    let options = {}
    if (params) {
      options.params = params
    }
    if (headers) {
      options.headers = headers
    }

    // eslint-disable-next-line no-console
    return instance.post(url, data, options)
  },
  put(url, params, headers) {
    let options = {}

    if (headers) {
      options.headers = headers
    }
    return instance.put(url, params, options)
  },
  delete(url, params, headers) {
    let options = {}

    if (params) {
      options.params = params
    }
    if (headers) {
      options.headers = headers
    }
    return instance.delete(url, options)
  }
}