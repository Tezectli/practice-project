/* 实例化接口的列表，用于在main.js注册
@author: 陈伟润
@date: 2019/7/11
*/
import apiList from './apiList'

const install = function (Vue) {
    // 假若已经注册就退出，因为全局只允许存在一个实例
    if (install.installed) {
        return
    }
    install.installed = true
    // 注册原型
    Object.defineProperties(Vue.prototype, {
        // 全局注册指令
        $api: {
            //为原型注册get
            get() {
                // 返回接口的列表以供全局注册
                return apiList
            }
        }
    })
}
export default {
    install
}