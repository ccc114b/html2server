# fileServer

```
PS D:\ccc\course\nodejs\code\02-koa\04-fileServer> node app.js
```

然後打開 http://localhost:3000/app.js 網址，或者 http://localhost:3000/README.md 網址。

如果該檔案不存在，會自動傳回 404 not found ! 

執行結果：


```
PS D:\ccc\course\nodejs\code\02-koa\03-fileServer> node app.js
(node:6368) ExperimentalWarning: The fs.promises API is experimental

  Error: ENOENT: no such file or directory, stat 'D:\ccc\course\nodejs\code\02-koa\03-fileServer\favicon.ico'


  Error: ENOENT: no such file or directory, stat 'D:\ccc\course\nodejs\code\02-koa\03-fileServer\xxx\yyy.html'
```