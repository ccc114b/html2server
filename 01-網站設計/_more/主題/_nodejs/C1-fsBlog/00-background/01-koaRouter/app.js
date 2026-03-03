const Koa = require('koa')
const KoaRouter = require('koa-router')
const koaLogger = require('koa-logger')

const app = new Koa()
const router = new KoaRouter()

router.get('/blog/:file', async (ctx) => {
  ctx.body = 'file:' + ctx.params.file
})

app.use(koaLogger()) // 使用 koa-logger 紀錄那些網址曾經被訪問過
app.use(router.routes()) // 使用 koa-router 路由
app.listen(3000) // 啟動 Server
console.log('server run at http://localhost:3000/')
