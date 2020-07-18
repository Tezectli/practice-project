# storage.js 本地接口数据缓存

::: tip
这个函数可以用来缓存当日可能多次访问但结果不会改变的接口数据。
:::

使用示例如下：
```
let cacheVal = storage.get('studentClasses');
const res = cacheVal ? cacheVal.value : await this.$api.common.getStudentClass()
storage.set('studentClasses', {value: res});

```