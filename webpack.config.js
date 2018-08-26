// 路径配置
const path = require('path')
const webpack = require('webpack')
// vue-loader@15 之后需要使用VueLoaderPlugin
const VueLoaderPlugin = require('vue-loader/lib/plugin');
// 生成html页面
const HTMLPlugin = require('html-webpack-plugin')
// 单独打包css
const extractPlugin = require('extract-text-webpack-plugin')
// 设置是否是开发化境  这里的process.env 在 package.json 中通过cross-env获取
const isDev = process.env.NODE_ENV === 'development'
// webpack配置项
const config = {
  // 编译运行目标
  target: 'web',
  // entry:入口文件  path.join:路径拼接  __dirname:根目录 
  entry: path.join(__dirname, 'src/'),
  // output:出口文件
  output: {
    // filename:文件名
    filename: 'bundle.[hash:8].js',
    path: path.join(__dirname,'dist')
  },
  plugins: [
    // make sure to include the plugin for the magic
    new VueLoaderPlugin(),
    new webpack.DefinePlugin({
      // 打包选这源代码
      'process.env': {
        NODE_ENV: isDev ? '"development"':'"production"'
      }
    }),
    // html设置
    new HTMLPlugin()
  ],
  module: {
    // rules:编译规则
    rules: [
      {
        // test:检测文件类型
        test: /\.vue$/,
        // loader: 匹配使用规则
        loader: 'vue-loader'
      },
      // 支持jsx语法
      {
        test: /\.jsx$/,
        loader: 'babel-loader'
      },
      {
        test: /\.(jpg|gif|jpeg|png)/,
        use: [
          {
            loader: 'url-loader',
            // loader:options配置项
            options: {
              // limit:文件大小
              limit: 1024,
              // name:图片名称 [name]:原来的名字[ext]:图片扩展名
              name: '[name].[ext]'
            }
          }
        ]
      }
    ]
  }
}
// 开发环境
if(isDev) {
  // 调试代码工具
  config.devtool = '#cheap-module-eval-source-map'
  config.module.rules.push(
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
  )
  // webpack-dev-server 配置项
  config.devServer = {
    // 端口
    port: '8080',
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
  // hot配置
  config.plugins.push(
    // 启动hot功能
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin()
  )
} else{
  // 生产环境
  // 生产环境要使用chunkhash
  config.output.filename ='[name].[chunkhash:8].js',
  // 打包框架文件
  config.entry = {
    app: path.join(__dirname,'src/index.js'),
    // 框架
    vendor: ['vue']
  }
  config.module.rules.push(
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
),
config.plugins.push(
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
)
}
module.exports = config