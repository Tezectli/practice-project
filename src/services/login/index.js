import api from '../index'
import urls from './urls'
import md5 from 'js-md5';
import axios from 'axios';
// import 'url-search-params-polyfill'
// 配置请求头
// eslint-disable-next-line no-unused-vars
const header = {}

export default {
  // 获取省份
  getProvince() {
    // return出去了一个promise
    return api.get(urls.getProvince)
  },
  // 获取城市
  getCity(province) {
    return api.get(urls.getCity(province))
  },
  // 获取学校
  getSchool(province, city) {
    return api.get(urls.getSchool(province, city))
  },
  // 教师登录
  teacherLogin(teacherName,password,orgId){
    password = md5(password)
    return api.post(urls.teacherLogin,{teacherName,password,orgId})
  },
  // 学生登录
  studentLogin(studentName,password,orgId){
    password = md5(password)
    // 该接口在旧版中的500/10/200状态都被视为通过，此处沿用旧版
    let params = new URLSearchParams();
    params.append('studentName', studentName);
    params.append("password", password);
    params.append("orgId", orgId);
    return axios.post(urls.studentLogin, params)
  },
  // 修改密码
   modifyTeacherPassword(oldPassword,newPassword){
     oldPassword = md5(oldPassword)
     newPassword = md5(newPassword)
    return api.post(urls.modifyTeacherPassword,{oldPassword,newPassword})
  },
  // 学生绑定微信
  bindWechat(type){
    return api.post(urls.bindWechat,{type})
  },
  // 获取学生账号信息
  getAccountInfo(){
    return api.get(urls.getAccountInfo)
  },
  // 学生快速登录
  studentQuickLogin(orgId,studentId,studentName){
    return api.post(urls.studentQuickLogin,{orgId,studentId,studentName})

  },
  // 学生登出
  studentLogout(){
    return api.get(urls.studentLogout)
  },
  // 教师登出
  teacherLogout(){
    return api.get(urls.teacherLogout)
  },
  // 学生注册
  studentRegister(grade,name,sex,idcard,school){
    return api.post(urls.studentRegister,{grade,name,sex,idcard,school})
  }
}