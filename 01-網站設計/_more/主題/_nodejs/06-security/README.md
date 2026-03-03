# 網站的安全性

Http 協定是沒有加密過的，而 Internet 的封包又很容易被窺視，因此網站設計經營者必須有安全性的概念。

當網站有《填表》或《傳送帳號密碼》的狀況時，更是必須採用 http 加密技術，否則對那些監控網的人而言，你的密碼根本就是明文！

目前 http 網站的加密，主要採用 SSL 技術，加密後的 http 運作協定，稱為 https 。

## SSL 加密技術

* 參考 -- https://nodejs.org/api/tls.html#tls_tls_ssl

用 openssl 產生金鑰與證書

```
// $ openssl req -nodes -new -x509 -keyout server.key -out server.cert
$ openssl req -new -nodes -newkey rsa:2048 -keyout server.key -out server.csr
```

或者從 SSLForFree 網站申請證書！ 

* https://www.sslforfree.com/

兩者你都得有 domain name 並已經架站才能通過驗證！ (否則瀏覽器還是會報紅字)

## 在 Node.js 中使用 HTTPS 協定

* 參考 -- https://nodejs.org/api/https.html




## 與 koa 搭配

* [koa 框架构建 Https 服务器指南](https://segmentfault.com/a/1190000007888088)
* https://www.rechberger.io/setup-https-letsencrypt-for-koa-js/
* https://stackoverflow.com/questions/44689542/add-ssl-to-node-js-koa-server
* https://github.com/turboMaCk/koa-sslify

## 使用 session 儲存帳號等資料

## 避免暴力攻擊

## 使用 captcha 避免自動程式攻擊