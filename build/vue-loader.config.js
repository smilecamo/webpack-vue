module.exports = (isDev) => {
  return {
    // 取消template中换行空格
    preserveWhitepace: true,
    // 把vue中的css抽出来 单独打包
    extractCSS: !isDev,
    // hotReload: false // 根据环境变量是否热重载
    cssModules: {
      // css命名
      localIdentName: isDev ? '[path]-[name]-[hash:base64:5]': '[hash:base64:5]',
      // 驼峰命名
      camelCase: true
    },
  }
}