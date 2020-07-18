import api from '../index'
import urls from './urls'

export default {
  // 发送通知
  noticeStudents(students, content, week, classId, resourceId) {
    let form = new FormData();
    form.append('students', JSON.stringify(students))
    form.append('notice', content)
    form.append('week', week)
    form.append('classId', classId)
    form.append('resourceId', resourceId)
    let param = new URLSearchParams(form)
    return api.post(urls.noticeStudents, param)
  },
  // 获取历史通知
  getHistoryNotice(classId, week) {
    return api.get(urls.getHistoryNotice(classId, week))
  },
  // 学生获取通知
  getMessages(type) {
    return api.get(urls.getMessages, {
      type
    })
  },
  // 学生已读通知
  read(messageId) {
    return api.post(urls.read, {
      messageId
    })
  },
  // 学生获取课程通知
  getNotice(userId, week) {
    return api.get(urls.getNotice(userId), {
      week
    })
  }
}