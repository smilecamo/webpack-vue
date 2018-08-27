// 路径配置
const path = require('path')
const webpack = require('webpack')
// vue-loader@15 之后需要使用VueLoaderPlugin
const VueLoaderPlugin = require('vue-loader/lib/plugin');
// 生成html页面
const HTMLPlugin = require('html-webpack-plugin')
// webpack合并配置
const merge = require('webpack-merge')

// 引入基本webpack配置
const baseConfig = require('./webpack.config.base.js')
// 首先声明原先的配置
let config
const defaultPlugins = [
  // make sure to include the plugin for the magic
  new VueLoaderPlugin(),
  new webpack.DefinePlugin({
    // 打包选这源代码
    'process.env': {
      NODE_ENV : '"development"'
    }
  }),
  // html设置
  new HTMLPlugin()
]
config = merge(baseConfig,{
  entry: path.join(__dirname,'../parctice/index.js'),
  // devtool 代码调试工具
  devtool: '#cheap-module-eval-source-map',
  module: {
    rules: [
      {
        test: /\.styl(us)?$/,
        use: [
          'style-loader',
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
      }
    ]
  },
  // devServer hot配置
  devServer,
  plugins: defaultPlugins.concat([
  // 启动hot功能
  new webpack.HotModuleReplacementPlugin(),
  new webpack.NoEmitOnErrorsPlugin()
  ])
})
module.exports = config
