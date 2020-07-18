import api from '../index'
import urls from './urls'

export default {
  // 获取课程内容
  getSubjectContent (classId) {
    return api.get(urls.getSubjectContent(classId))
  },
  // 提交修改内容
  submitSubjectContent (classId, subjectMission, subjectTarget, subjectPrepare, courseExplanation) {
    let form = new FormData();
    form.append('courseMission', subjectMission);
    form.append('courseTarget', subjectTarget);
    form.append('coursePrepare', subjectPrepare);
    form.append('courseExplanation', courseExplanation);
    let param = new URLSearchParams(form);
    return api.post(urls.submitSubjectContent(classId), param)
  },
  //学生端获取选课列表
  getCourseList (keyword,minPrice,maxPrice) {
    return api.get(urls.getCourseList,{keyword,minPrice,maxPrice})
  },
  //获取课表
  getMySchedule (startDate,endDate){
    return api.get(urls.getMySchedule,{startDate,endDate});
  },
  // 获取课程信息
  getCourseMsg (classId){
    return api.get(urls.getCourseMsg,{classId})
  },
  //获取教师课程表信息
  getTimeTable (){
    return api.get(urls.getTimeTable)
  },
  // 删除教学资源或教案
  deletePlanOrResource (id, type) {
    let form = new FormData();
    form.append('planOrResourceId', id);
    form.append('type', type);
    let param = new URLSearchParams(form);
    return api.post(urls.deletePlanOrResource, param)
  },
  //学生端获取课程教学资源
  getTeachResource(){
    return api.get(urls.getTeachResource)
  },
  //学生课程表
  getTeachScheduleByWeek(week){
    return api.get(urls.getTeachScheduleByWeek,{week})
  },
  //获取课程表当前周次
  getWeekInfo(){
    return api.get(urls.getWeekInfo)
  },
  //教师课程表
  getTeacherTimeTable(week){
    return api.get(urls.getTeacherTimeTable,{week})
  }
}
