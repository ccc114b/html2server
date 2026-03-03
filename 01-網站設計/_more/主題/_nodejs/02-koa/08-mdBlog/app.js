const Koa = require('koa')
const fs = require('fs')
const koaBody = require('koa-body')
const MarkdownIt = require('markdown-it')
const mdit = new MarkdownIt()

const app = module.exports = new Koa()
const path = require('path')
const extname = path.extname

app.use(koaBody({ jsonLimit: '1kb' }))

app.use(async function (ctx) {
  const fpath = path.join(__dirname, ctx.path)
  const fstat = await fs.promises.stat(fpath)
  console.log('fpath=', fpath)
  if (fstat.isFile()) {
    let ext = extname(fpath)
    if (ext === '.md') {
      let md = await fs.promises.readFile(fpath, 'utf8')
      let op = ctx.query.op
      ctx.type = '.html'
      switch (op) {
        case 'edit': ctx.body = mdEdit(md, ctx.path); break
        case 'save':
          let mdText = ctx.request.body.mdText
          await fs.promises.writeFile(fpath, mdText)
          ctx.redirect(ctx.path)
          break
        default: ctx.body = mdRender(md, ctx.path)
      }
    } else {
      ctx.type = ext
      ctx.body = fs.createReadStream(fpath)
    }
  }
})

app.listen(3000)
console.log('server run at http://localhost:3000/')

function layout (path, html) {
  return `
<html>
<head>
  <link rel="stylesheet" type="text/css" href="theme.css">
</head>
<body>
  <header><a href="${path}">View</a>　|　<a href="${path}?op=edit">Edit</a></header>
  <div class="main">
    <div class="content">
      ${html}
    </div>
  </div>
</body>
</html>
`
}

function mdRender (md, path) {
  return layout(path, `${mdit.render(md)}`)
}

function mdEdit (md, path) {
  return layout(path, `
    <form action="${path}?op=save" method="post">
      <textarea name="mdText">${md}</textarea>
      <br/><br/>
      <button>Save</button>
    </form>
  `)
}
