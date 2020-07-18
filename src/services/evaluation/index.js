import api from '../index'
import urls from './urls'

export default {
    // 获取模板评价内容
    initTemplate (target) {
        return api.get(urls.initTemplate,{target})
    },
    // 进行模板评价
    updateContent (updateList, target) {
        let form = new FormData();
        form.append('updateList', updateList);
        form.append('target', target);
        let param = new URLSearchParams(form);
        return api.post(urls.updateContent, param)
    },
    // 进行同伴模板互评
    updateFriendContent (updateList, friendList) {
        let form = new FormData ();
        form.append('updateList', updateList);
        form.append('friendList', friendList);
        let param = new URLSearchParams(form);
        return api.post(urls.updateFriendContent, param)
    },
    // 查询家长评价模板内容
    initFamilyTemplate (week) {
        return api.get(urls.initFamilyTemplate(week))
    },
    // 查询学生评价模板内容
    initStudentTemplate (week) {
        return api.get(urls.initStudentTemplate(week))
    },
    // 查询同伴模板评价内容
    initFriendTemplate (friendId, week) {
        return api.get(urls.initFriendTemplate(week), {friendId})
    },
    // 自定义评价
    customEvaluate (evaluateContent, postFile, target) {
        let form = new FormData();
        form.append('content', evaluateContent.content);
        form.append('contentId', evaluateContent.contentId);
        form.append('currencyId', evaluateContent.currencyId);
        form.append('subcurrencyId', evaluateContent.subcurrencyId);
        form.append('evaluationScore', evaluateContent.evaluationScore);
        form.append('target', target);
        let param = new URLSearchParams(form);
        let form2 = new FormData();
        form2.append('postFile', postFile,postFile.name);
        return api.post(urls.customEvaluate, param,
            {'Content-Type': 'multipart/form-data'},
            form2)
    },
    // 获取学校所有素养种类
    initCurrencyType () {
        return api.get(urls.initCurrencyType)
    },
    // 获取同伴
    getFriendList () {
        return api.get(urls.getFriendList)
    },
    // 同伴自定义评价
    customFriendEvalue (friendList, evaluateContent) {
        let form = new FormData ();
        form.append("friendList",friendList);
        let param = new URLSearchParams(form);
        return api.post(urls.customFriendEvalue, param,
            {},
            {...evaluateContent})
    },
}