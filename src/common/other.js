/* 其他配置，复用方法的出口类
@author: 陈伟润
@date: 2019/7/11
*/
// 判断是否在微信打开
// @return {boolean}
function isOnWechat() {
    const ua = navigator.userAgent.toLowerCase(); //获取判断用的对象
    if (ua.match(/MicroMessenger/i) == "micromessenger") {
        return true
    }
    return false
}

export {
    isOnWechat
}