module.exports = {
    devServer: {
        port: 5001,
        proxy: {
            '/api': {
                target: 'http://api:3001',
            },
        },
    },
    configureWebpack: {
        optimization: {
            splitChunks: {
                minSize: 10000,
                maxSize: 250000,
            }
        }
    },
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
