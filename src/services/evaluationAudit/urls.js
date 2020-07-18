/* 审核的简单请求接口
@author: 李健锋
@date: 2019/7/24
*/
import baseUrl from '../baseUrl'

export default {
  // 获取审核结果
  getAuditResult: (classId, week) => {return baseUrl + `/teacher/getDeclare/${classId}/${week}`},
  // 审核内容
  checkForAudit: baseUrl + '/teacher/checkDeclare'
}
