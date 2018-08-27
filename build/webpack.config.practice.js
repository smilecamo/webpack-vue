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
      NODE_ENV: '"development"'
    }
  }),
  // html设置
  new HTMLPlugin({
    template: path.join(__dirname, 'template.html')
  })
]
// webpack-dev-server 配置项
const devServer = {
  // 端口
  port: '8000',
  // 地址
  host: '0.0.0.0',
  // 爆出错误
  overlay: {
    // 在浏览器中显示
    errors: true
  },
  // 打开新页面 
  // open: true,
  hot: true
}
  // 使用merge，baseConfig是基础配置，后面的不会覆盖掉前面配置
  config = merge(baseConfig, {
    entry: path.join(__dirname,'../practice/index.js'),
    // devtool 代码调试工具
    devtool: '#cheap-module-eval-source-map',
    module: {
      rules: [{
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
      }]
    },
    // devServer hot配置
    devServer,
    resolve: {
      alias: {
        'vue': path.join(__dirname,'../node_modules/vue/dist/vue.esm.js')
      }
    },
    plugins: defaultPlugins.concat([
      // 启动hot功能
      new webpack.HotModuleReplacementPlugin(),
      new webpack.NoEmitOnErrorsPlugin()
    ])
  })
module.exports = config