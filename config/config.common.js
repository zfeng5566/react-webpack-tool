/*
 * @Description: created by wangzhijie
 * @Author: wangzhijie01
 * @LastEditors: wangzhijie
 * @Date: 2020-06-19 18:34:38
 * @LastEditTime: 2020-07-04 23:45:47
 */

const path = require('path');
var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var { CleanWebpackPlugin } = require('clean-webpack-plugin');
var UglifyjsWebpackPlugin = require('uglifyjs-webpack-plugin');
var { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');
/**
 * 返回一个绝对路径
 * @param {string} pathString 路径 
 */
function absPath(pathString) {
    return path.resolve(__dirname, pathString);

}
module.exports = (env) => {
    console.log('NODE_ENV: ', env.NODE_ENV) // 'local'
    const PRODUCTION = env.NODE_ENV === 'production';

    return {
        // 文件路径别名
        mode: env.NODE_ENV,
        entry: absPath('../src/pages/index.js'),
        // 如果是生产模式 则使用source-map 这样map文件就不会打包进js里了
        devtool: PRODUCTION ? 'source-map' : 'inline-source-map',
        output: {
            path: absPath('../dist'),
            filename: "[name].[contenthash:16].js",
            chunkFilename: "[name].[contenthash:16].js"
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
        optimization: {
            // tree sharking 功能，取消模块不使用的函数或变量
            usedExports: true,
            splitChunks: {
                chunks: 'all',
                name: true,
                cacheGroups: {
                    common: {
                        name: 'common',
                        test: /\/node_modules\/(react|react-dom|react-router-dom)/,
                        chunks: 'initial',
                        filename: 'common.[contenthash:16].js',
                        minChunks: 1,
                        priority: -1,
                    }
                }
            }
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
            // 打包后文件占比大小 ，用来优化打包的
            new BundleAnalyzerPlugin(),
            // new UglifyjsWebpackPlugin(), // 压缩代码
            // 自动生成一个html文件，并且包含了编译后的js文件
            new HtmlWebpackPlugin({
                //使用自定义html模板
                template: absPath('../src/html/index.html')
            }),
            new CleanWebpackPlugin({

            })
        ]
    }
}