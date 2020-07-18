/* 文件上传模块的请求接口
@author: 李健锋
@date: 2019/7/18
*/
import baseUrl from '../baseUrl'
export default {
  // 图片上传
  uploadPictures: baseUrl + '/teacher/uploadPictures',
  // 活动墙
  addActivityWall: baseUrl + '/teacher/addActivityWall',
  // 上传教案
  uploadTeachPlan: baseUrl + '/teacher/uploadTeachPlan',
  // 上传教学资源
  uploadTeachResource: baseUrl + '/teacher/uploadTeachResource'
}
