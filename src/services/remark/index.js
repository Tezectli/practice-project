import api from '../index'
import urls from './urls'

// 配置请求头
// eslint-disable-next-line no-unused-vars
const header = {
    'Content-Type': 'application/x-www-form-urlencoded',
 }

export default {
    // 获取评价模板
    getEvaluationTemplate(classId) {
        return api.get(urls.getEvaluationTemplate(classId))
    },
    // 获取历史评价列表
    getHistoryEvaluation(classId, week) {
        return api.get(urls.getHistoryEvaluation(classId, week))
    },
    // 删除历史评价列表
    deleteEvaluation(studentId, contentId, evaluationTime) {
        return api.post(urls.deleteEvaluation, {
            studentId,
            contentId,
            evaluationTime
        })
    },
    // 教师评价学生
    evaluateStudents(students,evaluations,week,classId,resourceId){
        let form = new FormData();
        form.append('students', JSON.stringify(students));
        form.append('evaluations',JSON.stringify(evaluations))
        form.append('week',week)
        form.append('classId', classId)
        form.append('resourceId',resourceId)
        let param = new URLSearchParams(form)
        return api.post(urls.evaluateStudents,param)
    }
}