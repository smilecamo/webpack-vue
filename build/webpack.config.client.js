// 路径配置
const path = require('path')
const webpack = require('webpack')
// vue-loader@15 之后需要使用VueLoaderPlugin
const VueLoaderPlugin = require('vue-loader/lib/plugin');
// 生成html页面
const HTMLPlugin = require('html-webpack-plugin')
// webpack合并配置
const merge = require('webpack-merge')
// 单独打包css
const extractPlugin = require('extract-text-webpack-plugin')
// 引入基本webpack配置
const baseConfig = require('./webpack.config.base.js')
// 设置是否是开发化境  这里的process.env 在 package.json 中通过cross-env获取
const isDev = process.env.NODE_ENV === 'development'
// 首先声明原先的配置
let config
const defaultPlugins = [
  // make sure to include the plugin for the magic
  new VueLoaderPlugin(),
  new webpack.DefinePlugin({
    // 打包选这源代码
    'process.env': {
      NODE_ENV: isDev ? '"development"' : '"production"'
    }
  }),
  // html设置
  new HTMLPlugin({
    template: path.join(__dirname,'template.html')
  })
]
// webpack-dev-server 配置项
const devServer = {
  // 端口
  port: '8080',
  // 地址
  host: '0.0.0.0',
  // 爆出错误
  overlay: {
    // 在浏览器中显示
    errors: true
  },
  // 映射路由
  historyApiFallback: {
    // 这里的public是base里面的
    index: '/public/index.html'
  },
  // 打开新页面
  // open: true,
  hot: true
}
// 开发环境
if(isDev) {
  // 使用merge，baseConfig是基础配置，后面的不会覆盖掉前面配置
  config = merge(baseConfig,{
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
} else{
  // 生产环境
  config = merge(baseConfig,{
    // 打包框架文件
    entry: {
      app: path.join(__dirname,'../client/index.js'),
      // 框架
      vendor: ['vue']
    },
    // 生产环境要使用chunkhash
    output: {
      filename: '[name].[chunkhash:8].js'
    },
    module: {
      rules: [
        // 单独打包css
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
    plugins: defaultPlugins.concat([
      // 单独打包css，文件名
      new extractPlugin('style.[contentHash:8].css'),
      // 单独框架输出
      new webpack.optimize.CommonsChunkPlugin({
        // 这里的名字必须和上面保持一致
        name: 'vendor'
      }),
      // 把webpack文件单独打包
      new webpack.optimize.CommonsChunkPlugin({
        name: 'runtime'
      })
    ])
  })
}
module.exports = config
