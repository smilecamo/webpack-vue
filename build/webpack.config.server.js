// 路径配置
const path = require('path')
const webpack = require('webpack')
const extractPlugin = require('extract-text-webpack-plugin')
// webpack合并配置
const merge = require('webpack-merge')
// 服务端渲染
const VueServerPlugin = require('vue-server-renderer/server-plugin')
// 引入基本webpack配置
const baseConfig = require('./webpack.config.base.js')
// 首先声明原先的配置
let config


  // 使用merge，baseConfig是基础配置，后面的不会覆盖掉前面配置
  config = merge(baseConfig, {
    // 打包环境
    target: 'node',
    entry: path.join(__dirname,'../client/server-entry.js'),
    // devtool 代码调试工具
    devtool: 'source-map',
    output: {
      libraryTarget: 'commonjs2',
      filename: 'server-entry.js',
      path: path.join(__dirname, '../server-build')
    },
    // 在node端不需要打包这些
    externals: Object.keys(require('../package.json').dependencies),
    module: {
      rules: [
        {
          test: /\.styl(us)?$/,
          use: extractPlugin.extract({
            fallback: 'style-loader',
            use: [
              'css-loader',
              {
                loader: 'postcss-loader',
                options: {
                  // 如果有前缀就不加
                  sourceMap: true
                }
              },
              'stylus-loader'
            ]
          })
        }
      ]
    },
    plugins: ([
      new extractPlugin('style.[contentHash:8].css'),
      new webpack.DefinePlugin({
        'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'development'),
        'process.env.VUE_ENV': '"server"'
      }),
      new VueServerPlugin()
    ])
  })
module.exports = config
