# 從 callback 到 async/await

## readfileCallback.js

```
PS D:\ccc\course\nodejs\code\00-nodejs\06-await> node readfileCallback hello.md
----readFile End-----
data=Hello World !

```

## copyfileSync.js

```
PS D:\ccc\course\nodejs\code\00-nodejs\06-await> node copyfileSync
讀取完成
寫入完成
```

## copyfileCallback.js

```
PS D:\ccc\course\nodejs\code\00-nodejs\06-await> node copyfileCallback
讀取完成！
寫入完成!
```

## copyfileCallback2.js

```
PS D:\ccc\course\nodejs\code\00-nodejs\06-await> node copyfileCallback2
讀取完成!
寫入完成!
又讀取完成 !
又寫入完成!
```

## copyfileEs6.js

```
PS D:\ccc\course\nodejs\code\00-nodejs\06-await> node copyfileEs6
(node:9196) ExperimentalWarning: The fs.promises API is experimental
讀取完成!
寫入完成!
又讀取完成 !
又寫入完成!
```

