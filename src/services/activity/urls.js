/* 活动模块的简单请求接口
@author: 李浩钊
@date: 2019/7/22
*/
import baseUrl from '../baseUrl'
export default {
    //教师端获取活动列表
    getActivityWall: baseUrl + '/teacher/getActivityWall',
    deleteActivityWall: baseUrl + '/teacher/deleteActivityWall',
    //学生端获取小队信息
    getTeam(userId){return baseUrl + `/student/Team/${userId}`},
    //学生端获取活动列表
    getAllActivities: baseUrl + '/api/activity/getAllActivities',
    //学生端获取活动列表中子活动的详细信息
    getActivityDetail(activityId){return baseUrl + `/api/activity/activityDetail/activity/${activityId}`},
    //创建小队
    postTeam(userId){return baseUrl + `/student/Team/${userId}`},
    //添加队员
    teammate(teamId){return baseUrl + `/student/Team/${teamId}/teammate`},
    //踢出队员
    deleteteammate(teamId,userId,processId){return baseUrl + `/student/Team/${teamId}/${processId}/teammate/${userId}`},
    //解散小队
    deleteTeam(teamId,processId){return baseUrl + `/student/Team/${teamId}/${processId}`},
    //退出小队
    leaveTeam(teamId,userId,processId){return baseUrl + `/student/Team/${teamId}/${processId}/${userId}`},
    //选择现有的小队报名
    choiceTeam(teamId,processId,userId){return baseUrl + `/student/Team/${teamId}/${processId}/${userId}`},
}