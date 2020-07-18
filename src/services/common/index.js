import api from '../index'
import urls from './urls'

// 配置请求头
// eslint-disable-next-line no-unused-vars
const header = {}

export default {
  // 获取上课周
  getWeekInfo() {
    // return出去了一个promise
    return api.get(urls.getWeekInfo)
  },
  // 获取教师上课的班级
  getTeachClass() {
    return api.get(urls.getTeachClass)
  },
  // 获取教师全部在课班级
  getAllClass() {
    return api.get(urls.getAllClass)
  },
  // 获取一个班级的对应学生
  getClassStudent(classId) {
    return api.get(urls.getClassStudent(classId))
  },
  // 按姓名搜索某个班的对应学生
  searchClassStudent(classId, studentName) {
    return api.get(urls.searchStudent(classId, studentName))
  },
  // 获取学生在课班级
  getStudentClass() {
    return api.get(urls.getStudentClass)
  },
  // 获取当前周次
  getCurrentWeek() {
    return api.get(urls.getCurrentWeek)
  }
}