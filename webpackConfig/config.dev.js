/*
 * @Description: created by wangzhijie
 * @Author: wangzhijie01
 * @LastEditors: wangzhijie01
 * @Date: 2020-06-17 17:24:04
 * @LastEditTime: 2020-06-19 19:34:53
 */

const path = require('path');

var HtmlWebpackPlugin = require('html-webpack-plugin');

/**
 * 返回一个绝对路径
 * @param {string} pathString 路径 
 */
function absPath(pathString) {
    return path.resolve(__dirname, pathString);

}
console.log('1', absPath('../src/pages/index.js'));
module.exports = {
    mode: "development",
    entry: absPath('../src/pages/index.js'),
    devtool: 'inline-source-map',
    output: {
        path: absPath('../dist'),
        filename: "bundle.js"
    },
    devServer: {
        contentBase: absPath('../'),
        hot: true
    },
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                use:[
                    'reac'
                ]

            },
            {
                test: /\.css$/,
                use: [
                    // 生成style标签，注入到DOM上
                    'style-loader',
                    // css-loader 用于解释@import 和 url()
                    'css-loader'
                ]
            },
            {
                test: /\.scss$/,
                use: [
                    {
                        loader: "style-loader" // 将 JS 字符串生成为 style 节点
                    },
                    {
                        loader: "css-loader" // 将 CSS 转化成 CommonJS 模块
                    },
                    {
                        loader: "sass-loader" // 将 Sass 编译成 CSS
                    }
                ]
            },
            {
                test: /\.less$/,
                use: [
                    {
                        loader: "style-loader" // 将 JS 字符串生成为 style 节点
                    },
                    {
                        loader: "css-loader" // 将 CSS 转化成 CommonJS 模块
                    },
                    {
                        loader: "less-loader" // 将 less 编译成 CSS
                    }
                ]
            }
        ]
    },
    plugins: [
        // 自动生成一个html文件，并且包含了编译后的js文件
        new HtmlWebpackPlugin({
            //使用自定义html模板
            template: absPath('../src/html/index.html')
        })
    ]
}