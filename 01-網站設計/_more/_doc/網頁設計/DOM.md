# HTML 文件物件模型 -- DOM (Document Object Model)

HTML 文件被瀏覽器解析後，會被轉成《樹狀結構》，這種《有很多節點的樹》就稱為 DOM。


JavaScript 通常會透過 DOM 模型去操控 HTML 文件，例如我們可以用 querySelector 或 querySelectorAll 去取得某些節點，然後再進行操作。

例如以下程式在按了鈕之後，原本的 Hello 就會變成 Hi。

```html
<html>
<body>
  <button onclick="document.querySelectorAll('div').forEach(o=>o.innerHTML='Hi!')">Say Hi</button>
  <div>Hello!</div>
  <div>Hello!</div>
</body>
</html>
```


## 學習

* https://www.w3schools.com/js/js_htmldom.asp
