/* 用户模块的简单请求接口
@author: 陈伟润
@date: 2019/7/15
*/
import baseUrl from '../baseUrl'
export default {
    getPlans: baseUrl + '/teacher/teacherLeader/getTeachPlan',
    planCheck: baseUrl + '/teacher/teacherLeader/checkTeachPlan',
    getAllSchedules: baseUrl + '/teacher/teacherLeader/getAllSchedules',
    saveTeacherScore: baseUrl + '/teacher/teacherLeader/saveTeacherScore',
    resetStudentPassword: baseUrl + '/teacher/resetStudentPassword',
    getAdjustScheduleOption: baseUrl + '/teacher/getAdjustScheduleOption',
    applyForAdjustSchedule: baseUrl + '/teacher/applyForAdjustSchedule',
    getApply: baseUrl + '/teacher/teacherLeader/getApply',
    checkApply: baseUrl + '/teacher/teacherLeader/checkApply',
    getStudentInfo: baseUrl + '/student/getStudentInfo',
    getStudentDetail:baseUrl + '/student/getStudentDetail',
    getAllStudent:baseUrl + '/student/getAllStudent',
    getStudentSchedule:baseUrl + '/student/getSchedule',
    addFriend:baseUrl + '/student/addFriend',
    getFirendApplication:baseUrl + '/student/getFriendApplication',
    reviewFriend:baseUrl + `/student/reviewFriend`,
    cancelStudentCourse:baseUrl+ `/teacher/cancelCourse`,
    addStudentFeedback:baseUrl + '/student/addFeedback',
    addTeacherFeedback:baseUrl + '/teacher/addFeedback',
    getFriendList:baseUrl + '/student/getFriendList',
    deleteFriend:baseUrl + '/student/deleteFriend'
}