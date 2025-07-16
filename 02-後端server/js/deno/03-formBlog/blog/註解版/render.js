// 匯出 layout 函式，用來產生 HTML 頁面的基本佈局
export function layout(title, content) {
    return `
    <html>
    <head>
      <title>${title}</title> <!-- 設定 HTML 頁面的標題 -->
      <style>
        body {
          padding: 80px; /* 設定頁面邊距 */
          font: 16px Helvetica, Arial; /* 設定字型 */
        }
    
        h1 {
          font-size: 2em; /* 設定 h1 標題大小 */
        }
    
        h2 {
          font-size: 1.2em; /* 設定 h2 標題大小 */
        }
    
        #posts {
          margin: 0;
          padding: 0;
        }
    
        #posts li {
          margin: 40px 0; /* 設定每篇貼文的上下邊距 */
          padding: 0;
          padding-bottom: 20px; /* 設定貼文的下邊距 */
          border-bottom: 1px solid #eee; /* 貼文之間的分隔線 */
          list-style: none; /* 移除列表項目的預設樣式 */
        }
    
        #posts li:last-child {
          border-bottom: none; /* 最後一篇貼文不顯示分隔線 */
        }
    
        textarea {
          width: 500px; /* 設定文本區的寬度 */
          height: 300px; /* 設定文本區的高度 */
        }
    
        input[type=text],
        textarea {
          border: 1px solid #eee; /* 設定邊框顏色 */
          border-top-color: #ddd;
          border-left-color: #ddd;
          border-radius: 2px; /* 設定邊框圓角 */
          padding: 15px; /* 設定內邊距 */
          font-size: .8em; /* 設定字體大小 */
        }
    
        input[type=text] {
          width: 500px; /* 設定文本輸入框的寬度 */
        }
      </style>
    </head>
    <body>
      <section id="content">
        ${content} <!-- 將動態生成的內容插入頁面 -->
      </section>
    </body>
    </html>
    `
  }
  
  // 匯出 list 函式，顯示所有貼文的列表
  export function list(posts) {
    let list = [] // 建立一個空陣列來儲存貼文列表
    for (let post of posts) {
      list.push(`
      <li>
        <h2>${ post.title }</h2> <!-- 顯示貼文標題 -->
        <p><a href="/post/${post.id}">Read post</a></p> <!-- 加入連結來閱讀該貼文 -->
      </li>
      `)
    }
    let content = `
    <h1>Posts</h1> <!-- 顯示貼文標題 -->
    <p>You have <strong>${posts.length}</strong> posts!</p> <!-- 顯示貼文數量 -->
    <p><a href="/post/new">Create a Post</a></p> <!-- 新增貼文的連結 -->
    <ul id="posts">
      ${list.join('\n')} <!-- 顯示貼文列表 -->
    </ul>
    `
    return layout('Posts', content) // 使用 layout 函式來產生整體佈局
  }
  
  // 匯出 newPost 函式，顯示新增貼文的表單
  export function newPost() {
    return layout('New Post', `
    <h1>New Post</h1> <!-- 新增貼文的標題 -->
    <p>Create a new post.</p>
    <form action="/post" method="post"> <!-- 建立表單，POST 方法送出數據 -->
      <p><input type="text" placeholder="Title" name="title"></p> <!-- 標題輸入框 -->
      <p><textarea placeholder="Contents" name="body"></textarea></p> <!-- 內容輸入框 -->
      <p><input type="submit" value="Create"></p> <!-- 提交按鈕 -->
    </form>
    `)
  }
  
  // 匯出 show 函式，顯示特定貼文的詳細內容
  export function show(post) {
    return layout(post.title, `
      <h1>${post.title}</h1> <!-- 顯示貼文的標題 -->
      <pre>${post.body}</pre> <!-- 顯示貼文的內容 -->
    `)
  }
  