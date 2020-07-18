// 资源地图
// const {
//   BundleAnalyzerPlugin
// } = require('webpack-bundle-analyzer')
// 提升构建速度
const HardSourceWebpackPlugin = require('hard-source-webpack-plugin');
// gzip压缩
const CompressionWebpackPlugin = require('compression-webpack-plugin');
// const SkeletonPlugin = require('page-skeleton-webpack-plugin').SkeletonPlugin
//JS混淆
const UglifyJSPlugin = require('uglifyjs-webpack-plugin')
    // 生产环境检测
const IS_PRODUCTION = process.env.NODE_ENV === 'production'
    // const path = require('path')
const cdn = [
    // vue
    'https://cdn.bootcss.com/vue/2.6.10/vue.min.js',
    // vue-rounter
    'https://cdn.bootcss.com/vue-router/3.1.3/vue-router.min.js',
    // axios
    'https://cdn.bootcss.com/axios/0.19.0-beta.1/axios.min.js',
    // echarts
    // 'https://cdn.jsdelivr.net/npm/echarts/dist/echarts.min.js',
]
const externals = {
    'vue': "Vue",
    "vue-router": "VueRouter",
    'axios': 'axios',
    'echarts': 'echarts',
}
let plugins = []
module.exports = {
    // 'devServer': {
    //     'port': 8080,
    //     'open': true,
    //     'disableHostCheck': true,
    //     'overlay': {
    //         'warnings': false,
    //         'errors': true
    //     },
    //     'proxy': {
    //         '/api': {
    //             'target': 'https://zhsj.bnuz.edu.cn/ComprehensiveSys',
    //             'changeOrigin': true,
    //             'pathRewrite': {
    //                 '^/api': ''
    //             }
    //         }
    //     }
    // },
    // 多线程打包，只要电脑不是单核就用所有cpu来打包
    productionSourceMap: false,
    parallel: require('os').cpus().length > 1,
    assetsDir: '',
    publicPath: '/',
    chainWebpack: config => {
        // 代码最小化
        config.optimization.minimize(true);
        config.optimization.splitChunks({
                chunks: "all",
                minChunks: 2,
            })
            // 小图自动转base64，大图压缩
            // config.module
            //   .rule('images')
            //   .use('image-webpack-loader')
            //   .loader('image-webpack-loader')
            //   .options({
            //     bypassOnDebug: true
            //   })
            //   .end()
            // 禁止首屏预加载其它路由
        config.plugins.delete('prefetch')
            // 生产环境开启资源地图
        if (IS_PRODUCTION) {
            // config.plugin('analyzer').use(BundleAnalyzerPlugin).end()
            plugins.push(new HardSourceWebpackPlugin())
            plugins.push(
                new CompressionWebpackPlugin({ //用于gzip
                    filename: '[path].gz[query]',
                    algorithm: 'gzip',
                    test: /\.(js|css|json|txt|html|ico|svg)(\?.*)?$/i,
                    threshold: 100, // 只有大小大于该值的资源会被处理
                    minRatio: 0.5, // 只有压缩率小于这个值的资源才会被处理
                    deleteOriginalAssets: false // 删除原文件
                })
            )
            plugins.push(
                new UglifyJSPlugin({
                    uglifyOptions: {
                        compress: {
                            drop_debugger: true, //关闭调试
                            drop_console: true, //关闭console
                        },
                        warnings: false, // 关闭警告
                    },
                    sourceMap: false,
                    parallel: true, //多进程打包
                })
            )
        }
        // 挂载cdn外部库
        config.plugin("html").tap(args => {
            args[0].cdn = cdn;
            // args[0].minify.removeComments = false
            return args;
        });
        config.externals(externals);
    },
    // 在这里写webpack的原生配置
    configureWebpack: {
        plugins: plugins,
    },
    css: {
        // 是否使用css分离插件 ExtractTextPlugin
        extract: true,
        loaderOptions: {
            sass: {
                data: '@import "@/scss/settings.scss";'
            }
        },
        // 启用 CSS modules for all css / pre-processor files.
        modules: false
    },
}