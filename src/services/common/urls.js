/* 通用的简单请求接口
@author: 陈伟润
@date: 2019/7/15
*/
import baseUrl from '../baseUrl'
export default {
    // 获取周数信息
    getWeekInfo: baseUrl + '/teacher/getWeekInfo',
    // 获取教学班级
    getTeachClass: baseUrl + '/teacher/teachClasses',
    // 获取教学全部班级（包含代课、调课)
    getAllClass: baseUrl + '/teacher/getClassNameStatus',
    // 获取班级学生
    getClassStudent: (classId) => {return baseUrl + `/teacher/getClassStudents/${classId}`},
    // 搜索班级学生
    searchStudent:(classId,studentName)=>{return baseUrl + `/teacher/searchClassStudents/${classId}/${studentName}`},
    // 获取学生在课班级
    getStudentClass: baseUrl + '/student/initStudentClass',
    // 获取学生当前周次
    getCurrentWeek: baseUrl + '/student/getCurrentWeek'
}
