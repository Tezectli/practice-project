// 用于将对应id映射成名字，与当前数据库字段对应 -润 2019/12/6

// gradeId
const gradeMap = {
    "-1": "全部",
    "1": "一年级",
    "2": "二年级",
    "3": "三年级",
    "4": "四年级",
    "5": "五年级",
    "6": "六年级",
    "7": "七年级",
    "8": "八年级",
    "9": "九年级",
    "10": "小班",
    "11": "中班",
    "12": "大班",
    "0": "成人",
};
// interestType
const interestTypeMap = {
    '-1': "全部",
    '0': "非兴趣",
    '1': "科学益智类",
    '2': "书法绘画类",
    '3': "舞蹈体育类",
    '4': "音乐艺术类",
    '5': "综合语言类",
};
// courseType
const courseTypeMap = {
    '0': "研学",
    '1': "实践",
    '2': "服务",
    '3': "兴趣",
};
// week
const weekMap = {
    '1': "周一",
    '2': "周二",
    '3': "周三",
    '4': "周四",
    '5': "周五",
    '6': "周六",
    '7': "周日"
};
// topicId
const topicMap = {
    0: 'form_post_yanxue',
    1: 'form_post_shijian',
    2: 'form_post_fuwu',
    3: 'form_post_yishu'
};
// postType
const postTypeMap = {
    form_post_application: "作品应用",
    form_post_works: "作品",
    form_post_other: "其它"
};
export {
    gradeMap,
    interestTypeMap,
    courseTypeMap,
    topicMap,
    postTypeMap,
    weekMap
}