/* 在线申报的简单请求接口
@author: 李健锋
@date: 2019/11/22
*/
import baseUrl from '../baseUrl'

export default {
    // 自主申报
    customDeclare: baseUrl + '/student/customDeclare',
    // 查看历史申报
    getMyDeclare: baseUrl + '/student/getMyDeclare'
}