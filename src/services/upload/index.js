// import api from '../index'
import urls from './urls'
import axios from 'axios'

// 配置请求头
// eslint-disable-next-line no-unused-vars
const header = {
     'Content-Type': 'multipart/form-data',
     'Test-header':'this is test-header'
};

export default {
  // 图片上传请求
  uploadPictures(file,classId) {
    let form = new FormData();
    form.append('file',file.file)
    form.append('classId',classId)
    return axios.post(urls.uploadPictures, form, {headers: {
        'Content-Type': 'multipart/form-data'
    }})
    // return api.post(urls.uploadPictures, form, header)
  },
  // 活动墙
  addActivityWall(content,fileList){
    let form = new FormData();
    form.append('content',content);
    for(let eachFile of fileList){
      form.append('file',eachFile.file)
    }
    return axios.post(urls.addActivityWall, form, {headers: {
      'Content-Type': 'multipart/form-data'
    }})
  },
  // 上传教案
  uploadTeachPlan(file, classId) {
    let form = new FormData();
    let newFileName = file.file.name.split(".")[0];
    form.append('file', file.file);
    form.append('classId', classId);
    form.append('newFileName', newFileName);
    return axios.post(urls.uploadTeachPlan, form, {headers: {
        'Content-Type': 'multipart/form-data'
    }})
  },
  // 上传教学资源
  uploadTeachResource(file, classId, isShare) {
    let form = new FormData();
    let newFileName = file.file.name.split(".")[0];
    form.append('file', file.file);
    form.append('classId', classId);
    form.append('newFileName', newFileName);
    form.append('isShare', isShare);
    return axios.post(urls.uploadTeachResource, form, {headers: {
        'Content-Type': 'multipart/form-data'
    }})
  }
}
