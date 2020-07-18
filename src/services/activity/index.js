import api from '../index'
import urls from './urls'

// 配置请求头
// eslint-disable-next-line no-unused-vars
const header = {}

export default {
    // 教师端获取活动列表
    getActivityWall(){
        return api.get(urls.getActivityWall)
    },
    deleteActivityWall(time){
        return api.post(urls.deleteActivityWall,{time})
    },
    //学生端获取小队信息
    getTeam(userId){
        return api.get(urls.getTeam(userId))
    },
    //学生端获取活动列表
    getAllActivities(keyword=""){
        return api.post(urls.getAllActivities,{keyword})
    },
    //学生端获取活动列表中子活动的详细信息
    getActivityDetail(activityId){
        return api.post(urls.getActivityDetail(activityId))
    },
    //创建小队
    postTeam(userId,processId,teamName,teamType,parentMen,parentWomen,activityUser){
        return api.post(urls.postTeam(userId),{processId,teamName,teamType,parentMen,parentWomen},{},{...activityUser})
    },
    //添加队员
    teammate(teamId,activityUser){
        return api.post(urls.teammate(teamId),{},{},{...activityUser})
    },
    //踢除队员
    deleteteammate(teamId,userId,processId){
        return api.delete(urls.deleteteammate(teamId,userId,processId))
    },
    //解散小队
    deleteTeam(teamId,processId){
        return api.delete(urls.deleteTeam(teamId,processId))
    },
    //退出小队
    leaveTeam(teamId,userId,processId){
        return api.delete(urls.leaveTeam(teamId,userId,processId))
    },
    //选择现有的小队报名
    choiceTeam(teamId,processId,userId,teamProcessId){
        return api.post(urls.choiceTeam(teamId,processId,userId),{teamProcessId})
    }
}