const Timestamp = new Date().getTime();
module.exports = {
    // webpack配置
    chainWebpack: config => {
        if (process.env.NODE_ENV === 'production') {
            // 给js和css配置版本号
            config.output.filename('js/[name].' + Timestamp + '.js').end();
            config.output.chunkFilename('js/[name].' + Timestamp + '.js').end();
            config.plugin('extract-css').tap(args => [{
                filename: `css/[name].${Timestamp}.css`,
                chunkFilename: `css/[name].${Timestamp}.css`
            }])
        }
    },
}

// const proxy = require('http-proxy-middleware');
// module.exports = {   
// devServer:{
//     port: 8080,
//     proxy:{
//         '/student':{
//             target: 'http://119.23.48.69:3000',//代理地址，这里设置的地址会代替axios中设置的baseURL
//             changeOrigin: true,// 如果接口跨域，需要进行这个参数配置
//     }}
// },
// }