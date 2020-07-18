/* 登录模块的简单请求接口
@author: 陈伟润
@date: 2019/7/11
*/
import baseUrl from '../baseUrl'
export default {
  getProvince: baseUrl + '/teacher/provinces',
  getCity:(province)=>{return baseUrl + `/teacher/provinces/${province}/cities`},
  getSchool:(province,city)=>{return baseUrl + `/teacher/provinces/${province}/cities/${city}/organizations`},
  teacherLogin: baseUrl + `/api/login/teacher`,
  studentLogin:  baseUrl + `/api/login/student`,
  modifyTeacherPassword: baseUrl + '/teacher/modifyTeacherPassword',
  bindWechat: baseUrl + '/wechat/login/wechatLogin',
  getAccountInfo: baseUrl + `/wechat/login/getStudentInfo`,
  studentQuickLogin: baseUrl + `/student/unfilter/quickLogin`,
  studentLogout:baseUrl + `/api/login/vue/student/logout`,
  teacherLogout:baseUrl + `/api/login/vue/teacher/logout`,
  studentRegister:baseUrl+ `/student/unfilter/register`

}