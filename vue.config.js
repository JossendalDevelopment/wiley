const path = require('path');

module.exports = {
    // build to server folder for deployment to heroku
    outputDir: path.resolve(__dirname, './server/public'),
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
