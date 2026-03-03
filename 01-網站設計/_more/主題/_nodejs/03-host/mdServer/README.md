# 03-fileServer

```
PS D:\ccc\course\ws\code\02-koa\06-mdServer2> node app
```

然後打開  http://localhost:3000/README.md 網址。

執行結果：


```
PS D:\ccc\course\ws\code\02-koa\06-mdServer2> node app
(node:12744) ExperimentalWarning: The fs.promises API is experimental
fpath= D:\ccc\course\ws\code\02-koa\06-mdServer2\README.md
fpath= D:\ccc\course\ws\code\02-koa\06-mdServer2\theme.css
fpath= D:\ccc\course\ws\code\02-koa\06-mdServer2\README.md
fpath= D:\ccc\course\ws\code\02-koa\06-mdServer2\theme.css
fpath= D:\ccc\course\ws\code\02-koa\06-mdServer2\README.md
fpath= D:\ccc\course\ws\code\02-koa\06-mdServer2\theme.css
fpath= D:\ccc\course\ws\code\02-koa\06-mdServer2\README.md
fpath= D:\ccc\course\ws\code\02-koa\06-mdServer2\theme.css
fpath= D:\ccc\course\ws\code\02-koa\06-mdServer2\README.md
fpath= D:\ccc\course\ws\code\02-koa\06-mdServer2\theme.css
```

然後你會看到 README.md 的呈現結果有套上 theme.css，所以變漂亮了！
