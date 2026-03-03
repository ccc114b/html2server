# XHR and CORS

## 範例 1


1. 在 corsServer/ 執行 deno run -A corsPattern.js // 或換成 corsAll.js / corsPart.js
2. 在 staticServer/ 執行 deno run -A staticServer.js

到 http://localhost:8002/cors.html ，然後開啟開發人員工具看執行結果

結果

1. corsAll.js fetch 成功
2. corsPart.js fetch 失敗 // 看來是 cors 套件在這裡有問題 ...
3. corsPattern.js fetch 成功
4. corsNo.js fetch 失敗 // 正確：因為沒有開啟 CORS


## 範例 2

* https://github.com/cccdeno/corsBlogFetch/

