const Koa = require('koa')
const koaLogger = require('koa-logger')
const app = new Koa()

app.use(koaLogger()) // 使用 koa-logger 紀錄那些網址曾經被訪問過
app.listen(3000) // 啟動 Server
console.log('server run at http://localhost:3000/')
