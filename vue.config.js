// const path = require('path');

module.exports = {
    // outputDir: path.resolve(__dirname, 'public'),
    devServer: {
        port: 5001,
        proxy: {
            '/api': {
                target: 'http://localhost:3001'
            }
        }
    },
//   chainWebpack: config => {
//     config.module
//       .rule('ignore')
//       .test(/\.vue$/)
//       .use('ignore-loader')
//         .loader('ignore-loader')
//         .options({
//             resourceQuery: '/blockType=notes/'
//         })
//   },
  configureWebpack: { }
}
