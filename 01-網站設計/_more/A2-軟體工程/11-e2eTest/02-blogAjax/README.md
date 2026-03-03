# 練習 -- 使用 puppeteer 測試你的 AJAX 程式 (完整)

## deno

手動

1. 請用 deno run -A app.js 執行 ，然後觀看 http://localhost:8000/
2. 使用 deno test 測試
  * deno test -A --unstable deno_test.js
  * 記得第一次
3. 仔細閱讀 deno_test.js 與 app.js
  * 理解其中的程式碼關係！

全自動

1. ./test.sh

```
   <script src="main.js"></script>

</body></html>
idx= 961
----- output end -----
Puppteer ... ok (12s)

ok | 1 passed | 0 failed (12s)


ccckmit@asus MINGW64 /d/ccc/ccc112a/html2denojs/A2-軟體工程/11-e2eTest/02-blogAjax (master)
$

ccckmit@asus MINGW64 /d/ccc/ccc112a/html2denojs/A2-軟體工程/11-e2eTest/02-blogAjax (master)
$ ./test.sh
Server run at http://127.0.0.1:8000
Check file:///D:/ccc/ccc112a/html2denojs/A2-%E8%BB%9F%E9%AB%94%E5%B7%A5%E7%A8%8B/11-e2eTest/02-blogAjax/deno_test.js
running 1 test from ./deno_test.js
Puppteer ...path= /
path= /main.js
path= /favicon.ico
[uncaught application error]: NotFoundError - 系
統找不到指定的檔案。 (os error 2): stat 'D:\ccc\ccc112a\html2denojs\A2-軟體工程\11-e2eTest\02-blogAjax\public\favicon.ico'

request: {
  url: "http://127.0.0.1:8000/favicon.ico",
  method: "GET",
  hasBody: false
}
response: { status: 404, type: undefined, hasBody: false, writable: true }

    at createHttpError (https://deno.land/std@0.152.0/http/http_errors.ts:188:10)
    at send (https://deno.land/x/oak@v11.1.0/send.ts:279:13)
    at eventLoopTick (ext:core/01_core.js:178:11)
    at async file:///D:/ccc/ccc112a/html2denojs/A2-%E8%BB%9F%E9%AB%94%E5%B7%A5%E7%A8%8B/11-e2eTest/02-blogAjax/app.js:20:3
    at async dispatch (https://deno.land/x/oak@v11.1.0/middleware.ts:41:7)
    at async allowedMethods (https://deno.land/x/oak@v11.1.0/router.ts:684:7)
    at async dispatch (https://deno.land/x/oak@v11.1.0/middleware.ts:41:7)
    at async dispatch (https://deno.land/x/oak@v11.1.0/middleware.ts:41:7)
    at async Application.#handleRequest (https://deno.land/x/oak@v11.1.0/application.ts:436:9)

------- output -------
html= <html><head>
    <title>Posts</title>
    <style>
      body {
        padding: 80px;
        font: 16px Helvetica, Arial;
      }

      h1 {
        font-size: 2em;
      }

      h2 {
        font-size: 1.2em;
      }

      #posts {
        margin: 0;
        padding: 0;
      }

      #posts li {
        margin: 40px 0;
        padding: 0;
        padding-bottom: 20px;
        border-bottom: 1px solid #eee;
        list-style: none;
      }

      #posts li:last-child {
        border-bottom: none;
      }

      textarea {
        width: 500px;
        height: 300px;
      }

      input[type=text],
      textarea {
        border: 1px solid #eee;
        border-top-color: #ddd;
        border-left-color: #ddd;
        border-radius: 2px;
        padding: 15px;
        font-size: .8em;
      }

      input[type=text] {
        width: 500px;
      }
    </style>
  </head>
  <body>
    <section id="content">
  <h1>Posts</h1>
  <p>You have <strong>0</strong> posts!</p>
  <p><a id="createPost" href="#new">Create a Post</a></p>
  <ul id="posts">

  </ul>
  </section>
    <script src="main.js"></script>

</body></html>
idx= 961
body =  [Object: null prototype] { type: "json", value: [Getter] }
create:id=> 0
create:get=> { title: "aaa", body: "aaa" }
create:save=> {
  title: "aaa",
  body: "aaa",
  created_at: 2023-12-21T08:48:11.507Z,
  id: 0
}
----- output end -----
Puppteer ... ok (10s)

ok | 1 passed | 0 failed (10s)
```


## Node.js

若需要更像 node.js 的測試框架可用 https://deno.land/x/test_suite

1. 請用 deno run -A app.js 執行 ，然後觀看 http://localhost:8000/
2. 使用 mocha + puppeteer 測試
  * mocha --timeout 100000
3. 仔細閱讀 test.js 與 app.js
  * 理解其中的程式碼關係！


先執行

```
$ deno run -A app.js
Server run at http://127.0.0.1:8000
``` ㄒ

然後在另一視窗執行

```
$ deno test -A --unstable test.js      
running 1 test from file:///C:/ccc/course/sa/se/08-verify/02-ajax/02-blogAjax/test.js
test Puppteer ... ok (8259ms)

test result: ok. 1 passed; 0 failed; 0 ignored; 0 measured; 0 filtered out (8848ms)        

```