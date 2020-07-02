/*
 * @Description: created by wangzhijie
 * @Author: wangzhijie01
 * @LastEditors: wangzhijie
 * @Date: 2020-06-17 17:24:04
 * @LastEditTime: 2020-06-21 21:46:57
 */

const path = require('path');

var HtmlWebpackPlugin = require('html-webpack-plugin');
console.log('11111111111')
console.log(process.env)
/**
 * 返回一个绝对路径
 * @param {string} pathString 路径 
 */
function absPath(pathString) {
    return path.resolve(__dirname, pathString);

}
console.log('1', absPath('../src/pages/index.js'));
module.exports = {
    // 文件路径别名
    alias:{

    },
    mode: "development",
    entry: absPath('../src/pages/index.js'),
    devtool: 'inline-source-map',
    output: {
        path: absPath('../dist'),
        filename: "bundle.js"
    },
    devServer: {
        contentBase: absPath('../'),
        hot: true, // 启用热更新
        historyApiFallback: true // 明白页面使用的history路由，切换之后不会引起webpack误会，以为是在跳转页面回返回404页面
    },
    resolve: {
        // 资源默认扩展名.
        extensions: [".ts", ".tsx", ".js", '.jsx']
    },
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                use: [
                    {
                        loader: "babel-loader"
                    }
                ]

            },
            {
                test: /\.(ts|tsx)$/,
                use: [
                    {
                        loader: "ts-loader"
                    }
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
            },
            {
                test: /\.(png|jpg|gif|jpeg|bmp)$/,
                use: [
                    {
                        loader: "file-loader"
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