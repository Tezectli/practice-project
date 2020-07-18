/* 设置各个环境的服务器地址
@author: 陈伟润
@date: 2019/7/11
*/
// let baseUrl = 'http://localhost:8080/ComprehensiveSys_war/'
let baseUrl = 'https://zhsj.bnuz.edu.cn/ComprehensiveSys' // 本地代理
switch (process.env.NODE_ENV) {
    case 'development':
        // baseUrl = 'http://localhost:8080/ComprehensiveSys_war' // 测试环境url
        baseUrl = 'https://zhsj.bnuz.edu.cn/ComprehensiveSys' // 生产环境url
            // baseUrl = 'http://zhsj.natapp1.cc/ComprehensiveSys'
        break
    case 'pre':
        baseUrl = 'https://172.20.13.15/' // 预上线环境url
        break
    case 'production':
        baseUrl = 'https://zhsj.bnuz.edu.cn/ComprehensiveSys' // 生产环境url
            // baseUrl = 'http://zhsj.natapp1.cc/ComprehensiveSys'
        break
}

export default baseUrl