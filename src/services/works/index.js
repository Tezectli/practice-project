import api from '../index'
import urls from './urls'

// 配置请求头
// eslint-disable-next-line no-unused-vars
const header = {}

export default {
    // 获取对应作品
    getWorks(classId, worksType, sortMode, studentId) {
        return api.get(urls.getWorks(classId, worksType, sortMode, studentId))
    },
    // 提交作品评价
    evaluateStudentWorks(postId, commentLevel, commentContent, studentId) {
        return api.post(urls.evaluateStudentWorks, {
            postId,
            commentLevel,
            commentContent,
            studentId
        })
    },
    // 学生获取指定课程的作品
    getWorksByClass(classId){
        return api.get(urls.getWorksByClass,{classId})
    },
    // 学生给其它作品点赞
    postLike(classId,postId){
        return api.post(urls.postLike,{classId,postId})
    },
    //获取活动作品
    getActivityProduct(){
        return api.get(urls.getActivityProduct)
    },
    //评价活动作品
    evaluateActivityProduct(productId,score,scoreTemplate){
        return api.post(urls.evaluateActivityProduct(productId), {
            score,
            scoreTemplate
        })
    }
}