// 删除秒，移除最后一个:后的内容。
function deleteSec(TimeString) {
    if (!TimeString) {
        return '不详'
    }
    return TimeString.length <= 5 ? TimeString : TimeString.substring(0, TimeString.lastIndexOf(":"))
}
// 删除年
function deleteYear(TimeString) {
    if (!TimeString) {
        return '不详'
    }
    return TimeString.substring(TimeString.indexOf("-") + 1, TimeString.length)
}
// 时间左填充。如2019-7-1转为2019-07-01
function leftPadZero(TimeString) {
    const date = TimeString.split("-");
    if (date[1] < 10) {
        date[1] = "0".concat(date[1]);
    }
    if (date[2] < 10) {
        date[2] = "0".concat(date[2]);
    }
    return date.join('-');
}
// 时间运算，将时间转为类似朋友圈的格式（1小时前，22分钟前，3天前...)
function getDateDiff(dateString) {
    const dateTimeStamp = getDateTimeStamp(dateString)
    const minute = 1000 * 60;
    const hour = minute * 60;
    const day = hour * 24;
    const month = day * 30;
    const now = new Date().getTime();
    const diffValue = now - dateTimeStamp;
    if (diffValue < 0) {
        return;
    }
    const monthC = diffValue / month;
    const weekC = diffValue / (7 * day);
    const dayC = diffValue / day;
    const hourC = diffValue / hour;
    const minC = diffValue / minute;
    let result = "不详"
    if (monthC >= 1) {
        result = "" + parseInt(monthC) + "月前";
    } else if (weekC >= 1) {
        result = "" + parseInt(weekC) + "周前";
    } else if (dayC >= 1) {
        result = "" + parseInt(dayC) + "天前";
    } else if (hourC >= 1) {
        result = "" + parseInt(hourC) + "小时前";
    } else if (minC >= 1) {
        result = "" + parseInt(minC) + "分钟前";
    } else {
        result = "刚刚";
    }
    return result;
}
// 将时间字符串转为时间戳
function getDateTimeStamp(dateStr) {
    return Date.parse(dateStr.replace(/-/gi, "/"));
}
// 节流函数
// fn是我们需要包装的事件回调, delay是时间间隔的阈值
function throttle(fn, delay) {
    // last为上一次触发回调的时间, timer是定时器
    let last = 0,
        timer = null
    // 将throttle处理结果当作函数返回
    return function () {
        // 保留调用时的this上下文
        let context = this
        // 保留调用时传入的参数
        let args = arguments
        // 记录本次触发回调的时间
        let now = +new Date()

        // 判断上次触发的时间和本次触发的时间差是否小于时间间隔的阈值
        if (now - last < delay) {
            // 如果时间间隔小于我们设定的时间间隔阈值，则为本次触发操作设立一个新的定时器
            clearTimeout(timer)
            timer = setTimeout(function () {
                last = now
                fn.apply(context, args)
            }, delay)
        } else {
            // 如果时间间隔超出了我们设定的时间间隔阈值，那就不等了，无论如何要反馈给用户一次响应
            last = now
            fn.apply(context, args)
        }
    }
}
export {
    deleteSec,
    leftPadZero,
    getDateDiff,
    throttle,
    deleteYear
}