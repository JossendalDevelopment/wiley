module.exports = {
  devServer: {
    port: 5001
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
