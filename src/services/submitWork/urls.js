/* 作品提交模块的简单请求接口
@author: 李健锋
@date: 2019/9/4
*/

import baseUrl from '../baseUrl'

export default {
    // 获取全部课程
    getMyCourse: baseUrl + '/student/getMyCourse',
    // 提交作品
    postProduct: baseUrl + '/student/postProduct',
    // 查询作品
    getMyProduct: baseUrl + '/student/getMyProduct'
}