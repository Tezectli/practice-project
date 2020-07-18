/* 学生端订单相关请求
@author: 黄焕新
@date: 2019/11/18
*/
import baseUrl from '../baseUrl'

export default {
  // 创建订单
  createOrder: baseUrl + `/student/createCourseOrder`,
  // 查看购物车订单
  getOrders: baseUrl + `/student/getMyOrder`,
  // 支付订单
  payOrder: baseUrl + `/student/pay/create`,
  // 免费课程支付
  payFree: (orderId, userId) => {return baseUrl + `/student/pay/class/${orderId}/${userId}`}
}
