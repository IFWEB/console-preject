var path = require('path');
var config = require('../config');
// var vueLoaderConfig = require('./vue-loader.conf');
var ExtractTextPlugin = require('extract-text-webpack-plugin');


function resolve(dir) {
    return path.join(__dirname, '..', dir)
}

module.exports = {
    entry: {
        app: './src/app.js',
        vendor: ['vue', 'vue-router', 'jQuery']
    },
    output: {
        path: config.build.assetsRoot,
        filename: '[name].js',
        publicPath: process.env.NODE_ENV === 'production' ? config.build.assetsPublicPath : config.dev.assetsPublicPath
    },
    resolve: {
        extensions: ['.js', '.vue', '.json'],
        alias: {
            'vue': 'vue/dist/vue.js',
            '@': resolve('src'),
            // '$': resolve('src/static/jquery.min.js')
        }
    },
    module: {
        rules: [
            // es语法规则校验插件
            // {
            //     test: /\.(js|vue)$/,
            //     loader: 'eslint-loader',
            //     enforce: 'pre',
            //     include: [resolve('src'), resolve('test')],
            //     options: {
            //         formatter: require('eslint-friendly-formatter')
            //     }
            // },
            {
                test: /\.vue$/,
                loader: 'vue-loader'
            }, {
                test: /\.css$/,
                use: ExtractTextPlugin.extract({
                    use: 'css-loader'
                })
            }
            // es6语法翻译插件，暂时不用
            // , {
            //     test: /\.js$/,
            //     loader: 'babel-loader',
            //     include: [resolve('src'), resolve('test')]
            // }
        ]
    },
    plugins: [
        new ExtractTextPlugin('styles.css')
    ]
}