import { Application, Router } from "https://deno.land/x/oak/mod.ts"; // 從 oak 模組匯入 Application 和 Router 類別
import * as render from './render.js' // 匯入本地的 render.js 模組，用於渲染 HTML

// 預設的貼文資料，包含兩篇貼文，每篇貼文有 id, title 和 body
const posts = [
  {id:0, title:'aaa', body:'aaaaa'},
  {id:1, title:'bbb', body:'bbbbb'}
];

const router = new Router(); // 建立 Router 物件，負責處理路由

// 定義路由與其對應的處理函式
router.get('/', list) // GET 請求到根路徑時，執行 list 函式
  .get('/post/new', add) // GET 請求到 /post/new 時，執行 add 函式
  .get('/post/:id', show) // GET 請求到 /post/:id 時，執行 show 函式
  .post('/post', create); // POST 請求到 /post 時，執行 create 函式

const app = new Application(); // 建立應用程式實例
app.use(router.routes()); // 使用路由中定義的所有路由
app.use(router.allowedMethods()); // 使用允許的方法來回應不支援的請求

// 當訪問根路徑時，顯示所有貼文列表
async function list(ctx) {
  ctx.response.body = await render.list(posts); // 使用 render 模組來渲染貼文列表
}

// 顯示新增貼文的表單
async function add(ctx) {
  ctx.response.body = await render.newPost(); // 使用 render 模組來渲染新增貼文的表單
}

// 顯示特定 id 的貼文內容
async function show(ctx) {
  const id = ctx.params.id; // 取得路由參數中的 id
  const post = posts[id]; // 根據 id 從 posts 中取得對應的貼文
  if (!post) ctx.throw(404, 'invalid post id'); // 如果找不到貼文，返回 404 錯誤
  ctx.response.body = await render.show(post); // 使用 render 模組來顯示貼文內容
}

// 接收表單數據並新增一篇貼文
async function create(ctx) {
  const body = ctx.request.body // 取得請求的 body 資料
  if (body.type() === "form") {
    const pairs = await body.form() // 解析表單數據
    const post = {} // 建立一個空的貼文物件
    for (const [key, value] of pairs) { // 將表單數據填入貼文物件
      post[key] = value
    }
    console.log('post=', post) // 在伺服器控制台輸出貼文內容
    const id = posts.push(post) - 1; // 將新貼文加入 posts 陣列，並設定其 id
    post.created_at = new Date(); // 設定貼文的建立時間
    post.id = id; // 設定貼文的 id
    ctx.response.redirect('/'); // 新增貼文後重定向回首頁
  }
}

console.log('Server run at http://127.0.0.1:8000') // 在伺服器啟動時輸出伺服器運行的 URL
await app.listen({ port: 8000 }); // 伺服器監聽 8000 埠號
