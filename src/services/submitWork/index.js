import api from '../index'
import urls from './urls'
import axios from 'axios'

export default {
    // 获取课程
    getMyCourse(keyword = "") {
        let form = new FormData();
        form.append('keyword', keyword)
        return api.get(urls.getMyCourse, new URLSearchParams(form))
    },
    postProduct(classId, postTitle, postContent, postType, topicId, postFile) {
        let form = new FormData();
        form.append('classId', classId);
        form.append('postTitle', postTitle);
        form.append('postContent', postContent);
        form.append('postType', postType);
        form.append('topicId', topicId);
        form.append('postFile', postFile);
        // return api.post(urls.postProduct, form, {
        //     'Content-Type': 'multipart/form-data'
        // })
        return axios.post(urls.postProduct, form, {headers: {
            'Content-Type': 'multipart/form-data'
        }})
    },
    getMyProduct(classId) {
        let form = new FormData();
        classId&&form.append('classId', classId)
        return api.get(urls.getMyProduct, new URLSearchParams(form))
    }
}