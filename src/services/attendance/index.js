import api from '../index'
import urls from './urls'

// 配置请求头
// eslint-disable-next-line no-unused-vars
const header = {
  'Content-Type': 'multipart/form-data'
}

export default {
    // 获取班级列表
    getClassNameStatus(){
        
    },
    // 获取日期列表
    getTeacherCourseTime(classId,day){
        return api.get(urls.getTeacherCourseTime(classId,day))
    },
    //获取考勤名单
    getStudentsAttendance(classId,day,time){
      return api.get(urls.getStudentsAttendance(classId,day,time))
    },
    //获取历史考勤名单
    getAttendanceByClassId(classId){
      return api.get(urls.getAttendanceByClassId(classId))
    }
}