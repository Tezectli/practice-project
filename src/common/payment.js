// import {
//     Toast
// } from "vant";

/* eslint-disable no-undef */
// 微信支付调起 -润 2019/11/30
// 调起微信支付
function onBridgeReady(payParams) {
    WeixinJSBridge.invoke(
        'getBrandWCPayRequest', {
        "appId": "wx301c65c0ff21dfac", //公众号名称，由商户传入
        "timeStamp": payParams.timeStamp, //时间戳，自1970年以来的秒数
        "nonceStr": payParams.nonceStr, //随机串
        "package": payParams.package,
        "signType": "MD5", //微信签名方式：
        "paySign": payParams.paySign //微信签名
    },
        function (res) {
            if (res.err_msg == "get_brand_wcpay_request:ok") {
                // 使用以上方式判断前端返回,微信团队郑重提示：
                //res.err_msg将在用户支付成功后返回ok，但并不保证它绝对可靠。
                // Toast.success('付款成功')
                Dialog.confirm({
                    title: "选课成功",
                    message: "是否继续选课？"
                })
                    .then(() => {
                        this.$router.replace("/s/selectCourse");
                    })
                    .catch(() => {
                        this.$router.replace("/s/myOrder");
                    });
            }
        });
}
// 暴露方法，视浏览器环境注册事件的监听器
function callWechatPay(payParams) {
    if (typeof WeixinJSBridge == "undefined") {
        if (document.addEventListener) {
            document.addEventListener('WeixinJSBridgeReady', onBridgeReady(payParams), false);
        } else if (document.attachEvent) {
            document.attachEvent('WeixinJSBridgeReady', onBridgeReady(payParams));
            document.attachEvent('onWeixinJSBridgeReady', onBridgeReady(payParams));
        }
    } else {
        onBridgeReady(payParams);
    }
}

export {
    callWechatPay
}