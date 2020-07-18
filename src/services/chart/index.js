import api from '../index'
import urls from './urls'

// 配置请求头
// eslint-disable-next-line no-unused-vars
const header = {}

export default {
    initRadar(classId,week){
        return api.get(urls.initRadar,{classId,week})
    }
}
