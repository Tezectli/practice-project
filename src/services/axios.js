/* 创建axios实例，配置请求和响应的拦截器
@author: 陈伟润
@date: 2019/7/11
@last: 2019/9/18 允许接口自行跨域 -润
*/
import axios from 'axios'
import {
  Toast
} from 'vant';

// 创建 axios 实例
let service = axios.create({
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials:true,
  timeout: 600000 // 最大等待时间
})

// 设置 post、put 默认 Content-Type
service.defaults.headers.post['Content-Type'] = 'application/json'
service.defaults.headers.put['Content-Type'] = 'application/json'
// 允许携带cookie以便跨域
service.defaults.withCredentials = true

// 添加请求拦截器
service.interceptors.request.use(
  (config) => {
    config.withCredentials = true
    if (config.method === 'post' || config.method === 'put') {
      // post、put 提交时，将对象转换为string, 为处理Java后台解析问题
      if(config.headers['Content-Type']!=="multipart/form-data"){
        config.data = JSON.stringify(config.data)
      }
    }
    // 请求发送前进行处理
    return config
  },
  (error) => {
    // 请求错误处理
    return Promise.reject(error)
  }
)

// 添加响应拦截器
service.interceptors.response.use(
  (response) => {
    // 取出响应内容
    let {
      data
    } = response.data
    // 错误拦截（例如202），针对教师
    // eslint-disable-next-line no-console
    if (response.data.code != 200) {
      // 报错弹出
      Toast.fail(response.data.detail || response.data.msg)
      return Promise.reject(response)
    }else{
      if(response.data.detail){
        Toast(response.data.detail);
      }
      else{
        if(response.data.msg !=="正常返回"){
          Toast(response.data.msg);
        }
      }
    }
    // 针对学生
    if(!response.data){
      Toast(response.detail || response.msg)
    }
    return data
  },
  (error) => {
    // 从响应中获取当前错误（未正确响应时）
    // eslint-disable-next-line no-unused-vars
    let info = {},
      {status,statusText,data} = error.response
    if (!error.response) {
      info = {
        code: 5000,
        msg: 'Network Error'
      }
    } else {
      // 此处整理错误信息格式
      info = {
        code: status,
        data: data,
        msg: statusText
      }
      Toast.fail(statusText)
    }
  }
)

/**
 * 创建统一封装过的 axios 实例
 * @return {AxiosInstance}
 */
export default function () {
  return service
}