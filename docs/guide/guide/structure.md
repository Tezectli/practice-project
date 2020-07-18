# 项目结构

```
zhsj-m
├─ dist    构建后生成的目录
├─ docs    项目文档，VuePress安装位置
│  ├─ .vuepress 文档配置与构建后的目录
│     ├─ config.js 文档样式，路由配置
│  ├─ guide 文档文件目录
│     ├─ xxx
│        ├─ xxx.md 实际的对应文档
├─ node_modules 第三方库目录
│  ├─ .cache webpack-hardsource生成的临时缓存目录
│  ├─ xxx 第三方库
├─ public 项目公用
├─ src 源码
│  ├─ assets 共用静态资源
│     ├─ img
│     ├─ others
│  │─ common 共用函数
│  ├─ components 页面组件
│     ├─ Student 学生端组件
│     ├─ xxx.vue 教师端组件
│  ├─ scss css预处理器配置
│  ├─ services 请求
│     ├─ xxx 功能模块
│        ├─ index.js 请求的具体js代码
│        ├─ urls.js 模块请求的地址
│  ├─ views 注册在路由上的页面
│     ├─ student 学生端页面
│     ├─ teacher 教师端页面
│     ├─ Student.vue/Teacher.vue 学生端，教师端的页面容器
│  ├─ App.vue 全局vue挂载节点
│  ├─ main.js 全局主函数
│  ├─ router.js 路由
├─ babel.config.js 用于ui组件库的按需引入
├─ vue.config.js webpack配置
```