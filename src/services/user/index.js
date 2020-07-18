import api from '../index'
import urls from './urls'
import axios from 'axios'
// 配置请求头
// eslint-disable-next-line no-unused-vars
const header = {
  'Content-Type': 'multipart/form-data'
}

export default {
  // 获取教案列表
  getPlans() {
    // return出去了一个promise
    return api.get(urls.getPlans)
  },
  // 审核教案内容
  planCheck(isPass, planId) {
    return api.post(urls.planCheck, {
      isPass,
      planId
    })
  },
  // 获取打分列表
  getAllSchedules() {
    return api.get(urls.getAllSchedules)
  },
  // 保存教师打分
  // eslint-disable-next-line no-unused-vars
  saveTeacherScore(teacherId, scheduleId, classId, score) {
    let form = new FormData();
    form.append('teacherScores[0].teacherId', teacherId);
    form.append('teacherScores[0].scheduleId', scheduleId)
    form.append('teacherScores[0].classId', classId)
    form.append('teacherScores[0].score', score)
    let param = new URLSearchParams(form);
    api.post(urls.saveTeacherScore, param)
  },
  resetStudentPassword(studentId){
    return api.post(urls.resetStudentPassword,{studentId})
  },
  // 获取请假申请信息列表
  getAdjustScheduleOption() {
      return api.get(urls.getAdjustScheduleOption)
    },
  // 提交请假申请
  applyForAdjustSchedule(data,file){
      let formdata = new FormData()
      if(file){
        formdata.append("file",file.file)
      }
      for(let item of Object.keys(data)){
        formdata.append(item,data[item]);
      }
        return axios.post(urls.applyForAdjustSchedule,formdata)
      
    },
  //获取请假审核信息列表
    getApply(){
      return api.get(urls.getApply)
    },
  //审批请假信息
  checkApply(isPass,teacherId,applyTime,scheduleId,newTeacherId,classId,newCourseDate,newCourseStartTime,newCourseEndTime,newClassroomId,status) {
    return api.post(urls.checkApply,{isPass,teacherId,applyTime,scheduleId,newTeacherId,classId,newCourseDate,newCourseStartTime,newCourseEndTime,newClassroomId,status})
  },
  //获取学生基本信息
  getStudentInfo(){
    return api.get(urls.getStudentInfo)
  },
  //获取学生详细信息
  getStudentDetail(classId){
    return api.get(urls.getStudentDetail,classId)
  },
  //根据班级ID获取所有学生
  getAllStudent(classId){
    return api.get(urls.getAllStudent,{classId})
  },
  // 按日期获取学生的课表
  getStudentSchedule(startDate,endDate){
    return api.get(urls.getStudentSchedule,{startDate,endDate})
  },
  //添加好友申请
  addFriend(studentId,applyContent){
    return api.post(urls.addFriend,{studentId,applyContent})
  },
  // 获取好友申请列表
  getFirendApplication(){
    return api.get(urls.getFirendApplication)
  },
  // 提交好友申请，删除好友或者添加好友的同意或拒绝
  reviewFriend(ID,operate){
    // 不通过状态值为2，通过状态值为1，默认为0
    return api.post(urls.reviewFriend,{ID,operate})
  },
  // 教师将学生从指定课程上删除
  cancelStudentCourse(classId,studentId){
    return api.post(urls.cancelStudentCourse,{classId,studentId})
  },
  //学生提交反馈
  addStudentFeedback(content){
    return api.post(urls.addStudentFeedback,{content})
  },
  //教师提交反馈
  addTeacherFeedback(content){
    return api.post(urls.addTeacherFeedback,{content})
  },
  //获取已加好友列表
  getFriendList(classId){
    return api.get(urls.getFriendList,{classId})
  },
  //删除已加好友
  deleteFriend(deleteId){
    return api.post(urls.deleteFriend,{deleteId})
  }
}