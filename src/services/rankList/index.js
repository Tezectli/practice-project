import api from '../index'
import urls from './urls'

export default {
  // 获取教师积分排行数据
  getTeacherIntegral(week) {
    return api.get(urls.getTeacherIntegral,{week})
  },
  // 获取教师关注率排行数据
  getTeacherAttentionRate(week) {
    return api.get(urls.getTeacherAttentionRate, {week})
  },
  // 获取学生积分排行数据
  getStudentIntegral(classId, week) {
    return api.get(urls.getStudentIntegral(classId),{week})
  }
}
