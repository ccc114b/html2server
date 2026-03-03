# koa 框架

## 01-hello

最簡單的 koa 伺服端程式，只會傳回 Hello World !

(預設正常傳回的狀態碼是 200 OK)

## 02-404

當網頁找不到的時候，通常我們會傳回 404 not found !

其他狀態碼請參考下列連結。

* [HTTP 狀態碼 (status code)](https://zh.wikipedia.org/wiki/HTTP%E7%8A%B6%E6%80%81%E7%A0%81)


## 03-static

採用 koa-static 模組，直接公開某些資料夾。


## 04-fileServer

用 koa 設計一個簡易的檔案伺服器！

## 05-mdServer

延伸 04-fileServer ，對副檔名為 md 的檔案進行轉換成 html 的處理！

(採用 markdown-it 來將 md 轉換為 html)。

## 06-mdServer2

延續 05-mdServer，但是套用 theme.css 來美化呈現結果。

## 參考文獻

* [基於Nodejs的Koa2基本教學](https://medium.com/@rorast.power.game/%E5%9F%BA%E6%96%BCnodejs%E7%9A%84koa2%E5%9F%BA%E6%9C%AC%E6%95%99%E5%AD%B8-67d1ce0bb59a)
* [阮一峰:Koa 框架教程](http://www.ruanyifeng.com/blog/2017/08/koa.html)
