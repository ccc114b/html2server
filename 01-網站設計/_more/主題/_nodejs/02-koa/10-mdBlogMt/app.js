const Koa = require('koa')
const fs = require('fs')
const koaBody = require('koa-body')
const MarkdownIt = require('markdown-it')
const mdit = new MarkdownIt({
  html: true,
  linkify: true,
  typographer: true
})

const app = module.exports = new Koa()
const path = require('path')
const extname = path.extname
const mt = require('chinese_convert')

app.use(koaBody({ jsonLimit: '1kb' }))

app.use(async function (ctx) {
  const fpath = path.join(__dirname, 'blog', ctx.path)
  let fstat = null
  let op = ctx.query.op
  let ext = extname(ctx.path)
  ctx.type = 'text/html'
  if (ctx.path === '/') ctx.redirect('/Home.md')

  if (op === 'save') { // 想要儲存檔案
    let mdText = ctx.request.body.mdText
    await fs.promises.writeFile(fpath, mdText) // 直接儲存之後
    ctx.redirect(ctx.path) // 顯示該檔案。
  }

  try {
    console.log('fpath=', fpath)
    fstat = await fs.promises.stat(fpath)
  } catch (error) {
    ctx.body = mdEdit(`# 錯誤\n\n路徑 ${ctx.path} 的檔案不存在\n您可以修改後儲存以創建新檔案！`, ctx.path)
    return
  }

  if (fstat.isFile()) {
    if (ext === '.md') {
      let md = await fs.promises.readFile(fpath, 'utf8')
      switch (op) {
        case 'edit': ctx.body = mdEdit(md, ctx.path); break // 回應編輯畫面
        default:
          if (op === 'tw2cn') md = mt.tw2cn(md)
          else if (op === 'cn2tw') md = mt.cn2tw(md)
          ctx.body = mdRender(md, ctx.path) // 將 markdown 轉為 HTML 傳回
      }
    } else { // 不是 .md 檔案
      ctx.type = ext
      ctx.body = fs.createReadStream(fpath) // 直接傳回該檔案串流
    }
  } else {
    ctx.body = mdRender(`# 錯誤\n\n路徑 ${ctx.path} 不是檔案，無法編輯！`, ctx.path)
  }
})

if (!module.parent) {
  app.listen(3000)
  console.log('server run at http://localhost:3000/')
}

function layout (path, html) {
  return `
<html>
<head>
  <link rel="stylesheet" type="text/css" href="theme.css">
</head>
<body>
  <header>
    <a href="/Home.md">Home</a> / 
    <a href="${path}">View</a> / 
    <a href="${path}?op=edit">Edit</a> / 
    <a href="${path}?op=tw2cn">简体</a> / 
    <a href="${path}?op=cn2tw">繁體</a>
  </header>
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

