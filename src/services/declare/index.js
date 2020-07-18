import api from '../index'
import urls from './urls'

export default {
    // 自主申报
    customDeclare (declareEvalue,classId) {
        return api.post(urls.customDeclare, {classId},{},
            {...declareEvalue}
        )
    },
    // 查看历史申报
    getMyDeclare (week) {
        return api.get(urls.getMyDeclare, {week})
    }
}