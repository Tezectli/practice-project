/* 排行榜模块的简单请求接口
@author: 李健锋
@date: 2019/7/22
*/
import baseUrl from '../baseUrl'

export default {
  // 获取教师积分排行
  getTeacherIntegral: baseUrl + `/teacher/getTeacherIntegral`,
  // 获取教师关注率排行
  getTeacherAttentionRate: baseUrl + `/teacher/getTeacherAttentionRate`,
  // 获取学生积分排行
  getStudentIntegral: (classId) => {return  baseUrl + `/teacher/getStudentIntegral/${classId}`},
}
