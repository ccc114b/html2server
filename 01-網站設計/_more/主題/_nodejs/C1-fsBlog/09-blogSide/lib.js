const fs = require('fs')

async function fileStat(file) { // 取得檔案狀態 （若不存在傳回 null)
  var fstate = null
  try {
    fstate = await fs.promises.stat(file)
  } catch (error) {}
  return fstate
}

function layout (ctx, body, side='') { // 套用 HTML 樣板 (有 css 與 header 區塊)
  let html = `
<html>
<head>
  <link rel="stylesheet" type="text/css" href="/blog/theme.css">
</head>
<body>
  <header>
    <a href="toggleSidebar()">≡</a>  
    <a href="/">首頁</a> / 
    ${ctx.session.userId == null ? '<a href="/user/login">登入</a>' : '<a href="/user/logout">登出</a>'}
    ${ctx.path.startsWith('/blog') ? ' / <a href="' + ctx.path + '?op=view">檢視</a>' : ''}
    ${ctx.path.startsWith('/blog')&&ctx.session.userId != null ? ' / <a href="' + ctx.path + '?op=edit">編輯</a>' : ''}
    ${ctx.session.userId == null ? '' : '/ 您已登入，帳號為 ' + ctx.session.userId}
  </header>
  <div class="main">
    <aside>
      ${side}
    </aside>
    <div class="content">
      ${body}
    </div>
  </div>
</body>
</html>
`
  return html
}

module.exports = {fileStat, layout}
