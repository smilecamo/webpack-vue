// 路径配置
const path = require('path')
// 设置是否是开发化境  这里的process.env 在 package.json 中通过cross-env获取
const isDev = process.env.NODE_ENV === 'development'
// vue-loader配置
const createVueLoaderOpations = require('./vue-loader.config')
// webpack配置项
const config = {
  // 编译运行目标
  target: 'web',
  // entry:入口文件  path.join:路径拼接  __dirname:根目录
  entry: path.join(__dirname, '../client/index.js'),
  // output:出口文件
  output: {
    // filename:文件名
    filename: 'bundle.[hash:8].js',
    path: path.join(__dirname,'../dist'),
    publicPath: '/public/'
  },
  module: {
    // rules:编译规则
    rules: [
      // eslint配置
      {
        test: /\.(vue|js|jsx)$/,
        loader: 'eslint-loader',
        exclude: /node_modules/,
        // 预处理
        enforce: 'pre'
      },
      {
        // test:检测文件类型
        test: /\.vue$/,
        // loader: 匹配使用规则
        loader: 'vue-loader',
        options: createVueLoaderOpations(isDev)
      },
      // 支持jsx语法
      {
        test: /\.jsx$/,
        loader: 'babel-loader'
      },
      // js
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: /node_modules/
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
              // resources/路径目录 name:图片名称 [name]:原来的名字[ext]:图片扩展名
              name: 'resources/[path][name].[hash:8].[ext]'
            }
          }
        ]
      }
    ]
  }
}
module.exports = config
