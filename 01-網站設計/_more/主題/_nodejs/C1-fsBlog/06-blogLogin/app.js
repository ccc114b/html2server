const fs = require('fs')
const path = require('path')
const Koa = require('koa')
const KoaRouter = require('koa-router')
const koaLogger = require('koa-logger')
const koaBody = require('koa-body')
const session = require('koa-session')
const MarkdownIt = require('markdown-it')
const mdit = new MarkdownIt({ // 創建 markdown 的轉換物件！
  html: true,
  linkify: true,
  typographer: true
})

const app = new Koa()
const router = new KoaRouter()

router
.get('/', async (ctx) => {
  ctx.redirect('/blog/Home')
})
.get('/blog/:file', blogViewFile)
.post('/blog/:file', blogSaveFile)
.get('/login', pageLogin)
.post('/login', login)
.get('/logout', logout)

app.use(koaLogger()) // 使用 koa-logger 紀錄那些網址曾經被訪問過
app.use(koaBody({ jsonLimit: '1kb' })) // 使用 koa-body 自動將 POST 訊息轉為物件方便存取。

app.keys = ['*@&))9kdjafda;983'] // app 的密鑰 => koa-session 會用到
const CONFIG = { // session 的密鑰與設定
  key: 'd**@&(_034k3q3&@^(!$!',
  maxAge: 86400000
}

app.use(session(CONFIG, app)) // 啟動 koa-session 功能
app.use(router.routes()) // 使用 koa-router 路由
app.listen(3000) // 啟動 Server
console.log('server run at http://localhost:3000/')

async function fileStat(file) { // 取得檔案狀態 （若不存在傳回 null)
  var fstate = null
  try {
    fstate = await fs.promises.stat(file)
  } catch (error) {}
  return fstate
}

function layout (ctx, body) { // 套用 HTML 樣板 (有 css 與 header 區塊)
  let html = `
<html>
<head>
  <link rel="stylesheet" type="text/css" href="/blog/theme.css">
</head>
<body>
  <header>
    <a href="/">首頁</a> / 
    ${ctx.session.userId == null ? '<a href="/login">登入</a>' : '<a href="/logout">登出</a>'}
    ${ctx.path.startsWith('/blog') ? ' / <a href="' + ctx.path + '?op=view">檢視</a>' : ''}
    ${ctx.path.startsWith('/blog')&&ctx.session.userId != null ? ' / <a href="' + ctx.path + '?op=edit">編輯</a>' : ''}
    ${ctx.session.userId == null ? '' : '/ 您已登入，帳號為 ' + ctx.session.userId}
  </header>
  <div class="main">
    <div class="content">
      ${body}
    </div>
  </div>
</body>
</html>
`
  return html
}

function mdRender (ctx, md) { // 呈現 .md 檔案的畫面
  return layout(ctx, mdit.render(md))
}

function mdEdit (ctx, md) { // 編輯 .md 檔案的畫面
  let body = (ctx.session.userId == null) ? '請先 <a href="/login">登入</a> 後才能編輯！': `
  <form id="editForm" action="${ctx.path}?op=save" method="post">
    <textarea name="mdText">${md}</textarea>
    <br/><br/>
    <button>儲存</button>
  </form>
  `
  return layout(ctx, body)
}

async function blogViewFile (ctx) {
  let file = ctx.params.file // 取得 param 中的 file 參數
  let op = ctx.query.op || 'view' // 取得 query 中的 op 參數
  let fpath = path.join(__dirname, 'blog', file) // 取得 blog 資料夾下 file 路徑指定的檔案。
  let ext = path.extname(file) // 取得副檔名
  ctx.type = 'text/html'
  switch (op) {
    case 'view': // 顯示檔案
      if (file.indexOf('.') >= 0) { // 第一種情形：有指定副檔名，那麼直接傳回該檔案串流。
        ctx.type = ext // 設定傳回型態為《副檔名》對應的型態。
        ctx.body = fs.createReadStream(fpath) // 直接傳回該檔案串流
      } else { // 第二種情形：沒有副檔名，那麼預設是要呈現 .md 檔案
        let fstat = await fileStat(fpath+'.md')
        if (fstat == null) { // 該 .md 檔案不存在，請使用者編輯！
          ctx.body = mdRender(ctx, `# 檔案不存在\n\n您可以 [創建這個檔案](/blog/${file}?op=edit) !`)
        } else { // 該 .md 檔案存在，轉成 html 後呈現
          let md = await fs.promises.readFile(fpath+'.md', 'utf8') // 讀取該 .md 檔案
          ctx.body = mdRender(ctx, md) // 將 markdown 轉為 HTML 傳回
        }
      }
      break
    case 'edit': // 編輯檔案
      let fstat = await fileStat(fpath+'.md')
      if (fstat == null) { // 該 .md 檔案不存在，提示編輯框！
        ctx.body = mdEdit(ctx, `# 檔案 ${file} 不存在\n\n您可以編輯後儲存以創建此檔案！`)
      } else { // 該 .md 檔案不存在，顯示編輯框！
        let md = await fs.promises.readFile(fpath+'.md', 'utf8') // 如果找到該 .md 檔案
        ctx.body = mdEdit(ctx, md); break // 回應編輯畫面  
      }
      break
  }
}

async function blogSaveFile(ctx) { // 處理 POST 儲存檔案的請求
  let file = ctx.params.file // 取得 param 中的 file 參數
  let fpath = path.join(__dirname, 'blog', file) // 取得 blog 資料夾下 file 路徑指定的檔案。
  let mdText = ctx.request.body.mdText // 取得使用者修改過的檔案字串
  await fs.promises.writeFile(fpath+'.md', mdText) // 寫入檔案系統
  ctx.redirect('/blog/'+file) // 顯示儲存完成後的檔案
}

function pageLogin (ctx) { // 顯示登入畫面
  ctx.body = layout(ctx, `
    <form action="login" method="post">
      <p style="color:red">${ctx.session.msg}</p>
      <p>
        <label>帳號</label><br/>
        <input name="id" type="text" value="">
      </p>
      <p>
        <label>密碼</label><br/>
        <input name="password" type="password" value="">
      </p>
      <button>登入</button>
    </form>
  `)
  ctx.session.msg = ''
}

const users = { // 預設的使用者帳號密碼
  'ccc': {password: '123'},
  'snoopy': {password: '456'}
}

async function login(ctx) { // 登入檢查
  let {id, password} = ctx.request.body // 取得使用者輸入的帳號密碼
  let user = users[id] // 取得 id 對應的使用者
  if (user != null && user.password == password) { // 如果該使用者存在且密碼正確，則登入成功
    ctx.session.userId = id // 用 session 記住這個使用者帳號
    ctx.redirect('/') // 導回首頁
  } else {
    ctx.session.msg = '登入失敗，請重新輸入!'
    ctx.redirect('/login') // 導回登入畫面並顯示錯誤訊息！
  }
}

async function logout(ctx) { // 登出
  ctx.session.userId = undefined // 從 session 中刪除該使用者 (強迫忘記該使用者)
  ctx.redirect('/login') // 回到登入畫面
}
