/* 课程的简单请求接口
@author: 李健锋
@date: 2019/7/25
@lastDate: 黄焕新 增加学生端选课模块相关接口
*/

import baseUrl from '../baseUrl'

export default {
  // 获取课程内容
  getSubjectContent: (classId) => {return baseUrl + `/teacher/getTeachContent/${classId}`},
  // 提交修改内容
  submitSubjectContent: (classId) => {return baseUrl + `/teacher/updateTeachContent/${classId}`},
  // 学生端获取选课列表
  getCourseList: baseUrl + `/student/initCourseList`,
  // 获取课表
  getMySchedule: baseUrl + `/student/getSchedule`,
  // 获取课程信息
  getCourseMsg: baseUrl + `/student/getCourseInfo`,
  //获取教师课程表信息
  getTimeTable: baseUrl + '/teacher/getTeachSchedule',
  // 删除教学资源或者教案
  deletePlanOrResource: baseUrl + '/teacher/deletePlanOrResource',
  //学生端获取课程教学资源
  getTeachResource:baseUrl + '/student/getTeachResource',
  //获取学生课程表信息
  getTeachScheduleByWeek: baseUrl + '/student/getTeachScheduleByWeek',
  //获取课程表当前周次
  getWeekInfo:baseUrl + '/teacher/getWeekInfo',
  //获取新版教师课程表信息
  getTeacherTimeTable: baseUrl + '/teacher/getTeachScheduleByWeek'
  
}
