/**
 * Babel 是一个工具链，主要用于将 ECMAScript 2015+ 版本的代码转换为向后兼容的 JavaScript 语法，
 * 以便能够运行在当前和旧版本的浏览器或其他环境中。下面列出的是 Babel 能为你做的事情：
 * 
 * 
 *  语法转换
 *  通过 Polyfill 方式在目标环境中添加缺失的特性 (通过 @babel/polyfill 模块)
 *  源码转换 (codemods)
 * 
 * 
 */

module.exports = {
    "presets": [
        "@babel/preset-react",
        [
            "@babel/preset-env",
            {
                // ES6语法转换成通用模块
                modules: "umd"
            }

        ]
    ]
}