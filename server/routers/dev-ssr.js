// 处理开发时
const Router = require('koa-router')
const axios = require('axios')
const path = require('path')
// 写入内存中
const MemoryFS = require('memory-fs')
const webapck = require('webapck')
const vueServer = require('vue-server-renderer')

const serverConfig = require('../../build/webpack.config.server.js')

const serverCompiler = webapckl(serverConfig)
const mfs = new MemoryFS()
// 指定输出目录
serverCompiler.outputFileSystem = mfs
let bundle
serverCompiler.watch({},(err,stats) => {
  if(err) throw err
  stats = states.toJson()
  stats.errors.forEach(err => console.log(err))
  stats.warning.forEach(warn => console.warn(err))

})
