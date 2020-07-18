/* 评价模块的简单请求接口
@author: 陈伟润
@date: 2019/7/15
*/
import baseUrl from '../baseUrl'
export default {
    // 评价模板
    getEvaluationTemplate: (classId)=>{return baseUrl + `/teacher/getEvaluationTemplate/${classId}`},
    // 历史评价
    getHistoryEvaluation: (classId,week)=>{return baseUrl + `/teacher/getHistoryEvaluation/${classId}/${week}`},
    // 删除评价
    deleteEvaluation: baseUrl+'/teacher/deleteEvaluation',
    // 上传评价
    evaluateStudents: baseUrl+'/teacher/evaluateStudents'
}