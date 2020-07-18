/* 作品模块的简单请求接口
@author: 陈伟润
@date: 2019/7/20
*/
import baseUrl from '../baseUrl'
export default {
    // 获取作品（教师端）
    getWorks:(classId,worksType,sortMode,studentId)=>{return baseUrl + `/teacher/getStudentWorks/${classId}/form_post_${worksType}/${sortMode}?studentId=${studentId}`},
    // 提交作品评价（教师端）
    evaluateStudentWorks: baseUrl + '/teacher/evaluateStudentWorks',
    // 学生获取指定课程的作品
    getWorksByClass: baseUrl + '/student/getAllProduct',
    // 学生给其它作品点赞
    postLike:baseUrl + '/student/thumbUp',
    //获取活动作品列表
    getActivityProduct:baseUrl + '/teacher/getActivityProduct',
    //提交活动作品评价
    evaluateActivityProduct:(productId)=>{return baseUrl+`/teacher/evaluateActivityProduct/${productId}`}
}