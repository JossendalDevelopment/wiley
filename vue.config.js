module.exports = {
    devServer: {
        port: 5001,
        proxy: 'http://localhost:3001'
        // proxy: {
        //     '/api': {
        //         target: 'http://localhost:3001',
        //         changeOrigin: true
        //     }
        // },
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
