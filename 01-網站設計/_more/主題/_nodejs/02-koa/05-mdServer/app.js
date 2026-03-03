const Koa = require('koa')
const fs = require('fs')
const MarkdownIt = require('markdown-it')
const mdit = new MarkdownIt()

const app = new Koa()
const path = require('path')

app.use(async function(ctx) {
  const fpath = path.join(__dirname, ctx.path)
  const fstat = await fs.promises.stat(fpath)
  console.log('fpath=', fpath)
  if (fstat.isFile()) {
    let ext = path.extname(fpath)
    // console.log('ext=', ext)
    if (ext === '.md') {
      let md = await fs.promises.readFile(fpath, 'utf8')
      let html = mdit.render(md)
      ctx.type = '.html'
      ctx.body = html
    } else {
      ctx.type = ext
      ctx.body = fs.createReadStream(fpath)
    }
  }
})

app.listen(3000)
console.log('server run at http://localhost:3000/')
