const Koa = require('koa')
const app = new Koa()

app.use(async function(ctx) {
  console.log('url=', ctx.url)
  ctx.body = 'path :' + ctx.url
})

app.listen(3000)
console.log('server run at http://localhost:3000/')
