import api from '../index'
import urls from './urls'

export default {
    createOrder(classId, coursePrice) {
        return api.post(urls.createOrder, { classId, coursePrice });
    },
    getOrders() {
        return api.get(urls.getOrders);
    },
    payOrder(orderId,returnUrl) {
        return api.get(urls.payOrder, { orderId,returnUrl });
    },
    payFree(orderId, userId) {
        return api.post(urls.payFree(orderId, userId),{orderId, userId});
    }
}
