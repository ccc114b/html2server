const Koa = require('koa')
const fs = require('fs')
const app = new Koa()
const path = require('path')

app.use(async function(ctx) {
  const fpath = path.join(__dirname, ctx.path)
  console.log('__dirname=', __dirname)
  console.log('fpath=', fpath)
  const fstat = await fs.promises.stat(fpath)
  console.log('fstat=', fstat)
  if (fstat.isFile()) {
    let type = path.extname(fpath)
    console.log('type=', type)
    ctx.type = type
    console.log('ctx.type=', ctx.type)
    ctx.body = fs.createReadStream(fpath)
  }
})

app.listen(3000)
console.log('server run at http://localhost:3000/')

