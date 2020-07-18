module.exports = {
    title: '爱实践文档',
    description: '移动端的开发文档',
    lang: 'zh-cn',
    themeConfig: {
        sidebar: [{
                title: '开发指南',
                collapsable: false,
                children: [
                    ['./guide/guide/structure', '项目结构']
                ]
            },{
                title: '接口',
                collapsable: false,
                children: [
                    ['./guide/service/chart', 'chart 可视化'],
                    ['./guide/service/login', 'login 登录'],
                    ['./guide/service/common', 'common 常用'],
                    ['./guide/service/upload', 'upload 图片/文件上传']
                ]
            },
            {
                title: '共用函数',
                collapsable: false,
                children: [
                    ['./guide/function/time', 'time.js 时间处理'],
                    ['./guide/function/storage', 'storage.js 接口数据缓存']
                ]
            }
        ]
    },
    markdown: {
        lineNumbers: true
    }
}