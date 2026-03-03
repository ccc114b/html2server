var MarkdownIt = require('markdown-it'),
    md = new MarkdownIt();
var html = md.render(`
# Chapter 1

## Section 1

## 課程 -- 網站設計進階

欄位   | 連結
-------|-----------------------------------------------
書籍   |  [網站設計 -- 採用 Node.js 為 Server 端技術](https://github.com/ccccourse/ws/tree/master/code)
程式   |  https://github.com/ccccourse/ws
教師   | [陳鍾誠](http://www.nqu.edu.tw/educsie/index.php?act=blog&code=list&ids=4) 於 [金門大學](http://www.nqu.edu.tw/) [資訊工程系](http://www.nqu.edu.tw/educsie/index.php) 
`);

console.log(html)