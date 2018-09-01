const Koa = require('koa')

const app = new Koa()

const isDev = process.env.NODE_ENV === 'development'
// 爆出错误 koa的中间件
app.use(async (ctx, next) => {
  try {
    console.log(`require with path ${ctr.path}`)
  } catch (err) {
    console.log(err)
    ctr.staus = 500
    if (isDev) {
      ctr.body = err.message
    } else {
      ctr.body = 'please try again'
    }
  }
})
