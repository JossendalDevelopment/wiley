// const path = require('path');

module.exports = {
    // outputDir: path.resolve(__dirname, 'public'),
    devServer: {
        port: 5001,
        proxy: {
            '/api': {
                target: 'http://localhost:3001',
            },
            '/stream': {
                target: 'http://localhost:3001',
            },
        },
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
    configureWebpack: {},
    chainWebpack: config => {
        config.plugin('preload').tap(options => {
            // included by vue. Attempt to preload images
            options[0].as = entry => {
                if (/\.css$/.test(entry)) return 'style';
                if (/\.woff$/.test(entry)) return 'font';
                if (/\.png$/.test(entry)) return 'image';
                return 'script';
            };
            options[0].include = 'allAssets';
            // options[0].fileWhitelist: [/\.files/, /\.to/, /\.include/]
            // options[0].fileBlacklist: [/\.files/, /\.to/, /\.exclude/]
            return options;
        });
    },
};
