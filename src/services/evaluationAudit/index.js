import api from '../index'
import urls from './urls'

export default {
  // 获取审核结果
  getAuditResult(classId, week) {
    return api.get(urls.getAuditResult(classId, week))
  },
  // 审核内容
  checkForAudit(passed, studentId, contentId, currencyId, subcurrencyId, submitTime) {
    let form = new FormData();
    form.append('passed', passed);
    form.append('studentId', studentId);
    form.append('contentId', contentId);
    form.append('currencyId', currencyId);
    form.append('subcurrencyId', subcurrencyId);
    form.append('submitTime', submitTime);
    let param = new URLSearchParams(form)
    return api.post(urls.checkForAudit, param)
  }
}
