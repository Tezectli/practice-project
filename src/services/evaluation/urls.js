/* 综合评价的简单请求接口
@author: 李健锋
@date: 2019/9/17
*/
import baseUrl from '../baseUrl'

export default {
    // 获取模板评价内容
    initTemplate: baseUrl + '/student/initTemplate',
    // 进行模板评价
    updateContent: baseUrl + '/student/updateContent',
    // 进行同伴模板互评
    updateFriendContent: baseUrl + '/student/updateFriendContent',
    // 查询家长历史模版评价内容
    initFamilyTemplate: (week)=> {return baseUrl + `/student/initFamilyTemplate/${week}` } ,
    // 查询学生历史模版评价内容
    initStudentTemplate: (week)=> {return baseUrl + `/student/initStudentTemplate/${week}` } ,
    // 查询同伴历史模版评价内容
    initFriendTemplate: (week)=> {return baseUrl + `/student/initFriendTemplate/${week}` }  ,
    // 自定义评价
    customEvaluate: baseUrl + '/student/customEvalue',
    // 获取学校所有素养种类
    initCurrencyType: baseUrl + '/student/initCurrencyType',
    // 获取好友列表
    getFriendList: baseUrl + '/student/getFriendList',
    // 同伴自定义评价
    customFriendEvalue: baseUrl + '/student/customFriendEvalue',
    
}
