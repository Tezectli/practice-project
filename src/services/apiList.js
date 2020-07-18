/* 写入各模块接口
@author: 陈伟润
@date: 2019/7/11
*/
// 登录模块
import login from './login'
// 用户中心模块
import user from './user'
// 评价模块
import remark from './remark'
// 公共模块
import common from './common'
// 图片上传模块
import upload from './upload'
// 作品模块
import works from './works'
// 活动模块
import activity from './activity'
// 考勤模块
import attendance from './attendance'
// 通知模块
import inform from './inform'
// 排行榜模块
import rankList from './rankList'
// 课程模块
import course from './course'
// 审核模块
import evaluationAudit from './evaluationAudit'
// 图表可视化模块
import chart from './chart'
// 作品提交模块
import submitWork from './submitWork'
// 综合评价模块
import evaluation from './evaluation'
// 订单模块
import pay from './pay'
// 自主申报模块
import declare from './declare'
export default {
    login,
    user,
    common,
    remark,
    upload,
    attendance,
    works,
    activity,
    inform,
    rankList,
    course,
    evaluationAudit,
    chart,
    submitWork,
    evaluation,
    pay,
    declare
}
