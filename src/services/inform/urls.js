/* 通知模块的简单请求接口
@author: 李健锋
@date: 2019/7/22
*/
import baseUrl from '../baseUrl'

export default {
  // 发送通知
  noticeStudents: baseUrl + '/teacher/noticeStudents',
  // 获取历史通知
  getHistoryNotice: (classId, week) => {return baseUrl + `/teacher/getHistoryNotice/${classId}/${week}`},
  // 获取学生历史通知
  getMessages: baseUrl + `/student/getMessages`,
  // 已读消息学生端
  read: baseUrl + `/student/read`,
  // 学生获取课程通知
  getNotice:(userId) =>{return baseUrl + `/student/notice/${userId}`}
}
