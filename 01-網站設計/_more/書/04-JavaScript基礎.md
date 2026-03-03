# 第 4 章：JavaScript 基礎

## JavaScript 簡介

JavaScript是一種腳本語言，通常用於網頁上的客戶端腳本編程，用於網頁的動態效果、表單驗證、網頁交互等。它是一種基於物件和事件驅動的語言，編程風格靈活，支持面向對象和函數式編程。

JavaScript最初由Netscape公司在1995年推出，最初的名字是LiveScript。隨著網頁技術的發展，JavaScript變得越來越流行，並被廣泛用於網頁開發中。現在，JavaScript已經成為前端開發的必備技能之一。

JavaScript具有以下特點：

1. 輕量級：JavaScript的代碼輕巧簡潔，容易學習和使用。
2. 解釋性：JavaScript是一種解釋性語言，不需要編譯器。
3. 物件導向：JavaScript支持面向對象編程，但不像Java或C++那樣嚴格。
4. 跨平台性：JavaScript可以在各種瀏覽器和操作系統上運行。
5. 動態性：JavaScript的變數和函數可以動態創建和修改。

JavaScript通常用於前端網頁開發，但它也可以用於後端開發，例如使用Node.js進行伺服器端程式設計。

## JavaScript 語法和數據類型

JavaScript的語法和數據類型是學習JavaScript的重要基礎。以下是JavaScript的語法和常用的數據類型：

### JavaScript 語法

1. 註釋：在JavaScript中，使用//或/* */表示註釋，註釋是用來說明代碼的，不會被執行。

2. 變數聲明：在JavaScript中，使用var、let或const關鍵字聲明變數。

3. 操作符：JavaScript支持各種操作符，包括算術、比較、邏輯、位、賦值和三元操作符。

4. 條件語句：JavaScript支持if、else、switch等條件語句。

5. 循環語句：JavaScript支持for、while、do-while等循環語句。

6. 函數聲明：在JavaScript中，使用function關鍵字聲明函數。

### JavaScript 數據類型

1. 原始數據類型：JavaScript有6種原始數據類型，包括數字、字符串、布爾值、null、undefined和Symbol。

2. 對象數據類型：JavaScript中的對象數據類型包括物件、數組和函數等。

3. 特殊數據類型：JavaScript還有NaN和Infinity等特殊數據類型。

4. 動態類型：JavaScript是一種動態類型語言，變數的數據類型可以在運行時根據需要自動改變。

5. 類型轉換：JavaScript中有多種類型轉換方法，例如使用parseInt()、parseFloat()、toString()和Number()等方法。

JavaScript的語法和數據類型是非常重要的基礎知識，在學習和使用JavaScript時需要深入了解和掌握。

## JavaScript 函數和作用域

JavaScript中的函數和作用域是非常重要的概念，深入理解它們可以讓我們更好地使用JavaScript進行編程。

### 函數

在JavaScript中，函數是一種可重用的代碼塊，可以在程序中任何地方調用。JavaScript中的函數可以通過function關鍵字來聲明，例如：

```js
function sum(a, b) {
  return a + b;
}
```

在上面的例子中，我們聲明了一個名為sum的函數，它接受兩個參數a和b，並返回它們的和。我們可以通過以下方式調用這個函數：

```js
var result = sum(1, 2);
console.log(result); // 3
```

在JavaScript中，函數也是一種對象，它們可以賦值給變量，也可以作為參數傳遞給其他函數。

### 作用域
JavaScript中的作用域指的是變量的可見範圍。在JavaScript中，有全局作用域和局部作用域之分。

全局作用域是指在整個程序中都可以訪問的變量，它們通常是在程序開始時聲明的。

局部作用域是指在函數內部聲明的變量，只能在函數內部訪問。在JavaScript中，每個函數都有自己的作用域，也可以在一個函數中定義另一個函數，這個函數的作用域就是嵌套在父函數內的局部作用域。

在JavaScript中，作用域鏈（Scope Chain）是一個重要的概念，它描述了變量在嵌套的作用域中如何被查找。當一個變量在某個作用域中被查找時，如果找不到，JavaScript會沿著作用域鏈往上查找，直到找到為止。如果最終都沒有找到，則會報錯。

了解JavaScript中的函數和作用域是非常重要的，它們可以幫助我們更好地設計和組織JavaScript代碼。