/* 封装操作localStorage本地存储的方法
* 实现当日缓存功能（排行榜模块）
@author: 李健锋
@date: 2019/9/21
*/

const storage = {
    // 存储
    set (key, value) {
        // 失效时间（秒), 默认为一天
        let time = 60 * 60 * 24 * 1000;
        let cacheExpireDate = (new Date() - 1) + time * 1000;//过期时间
        let cacheVal = {
            value: value.list,//缓存内容
            expire: cacheExpireDate,//失效时间
            // 为了其他组件可复用
            week: value.week ? value.week : "",
            classId: value.classId ? value.classId : ""
        };
        localStorage.setItem(key, JSON.stringify(cacheVal))
    },
    // 提取
    get (key) {
        let cacheVal = JSON.parse(localStorage.getItem(key));
        let now = new Date() - 1;//获取当前时间
        // 缓存不存在
        if (!cacheVal) {
            return null
        }
        // 缓存过期
        if (now > cacheVal.expire) {
            this.remove(key);//过期删除
            return ""
        }
        return cacheVal
    },
    // 删除
    remove (key) {
        localStorage.removeItem(key)
    }
};


// 暴露给外部访问
export default storage;