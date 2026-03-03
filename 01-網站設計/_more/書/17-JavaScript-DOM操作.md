# 第 17 章：JavaScript DOM 操作

## DOM 的概述和基本結構

DOM（Document Object Model）是一種用於表示和操作HTML和XML文檔的API。在Web開發中，通常使用JavaScript來操作DOM，從而動態地修改網頁內容和交互。

DOM以樹狀結構的方式組織文檔內容，每個節點都是一個對象，可以使用JavaScript來訪問和操作這些節點。DOM節點可以分為三種類型：

1. 元素節點（Element nodes）：代表HTML文檔中的標籤，例如div、p、img等等。

2. 文本節點（Text nodes）：代表HTML文檔中的文本內容，例如段落中的文字或者標籤中的屬性值。

3. 屬性節點（Attribute nodes）：代表HTML文檔中的屬性，例如img標籤中的src屬性。

在DOM中，所有節點都是由節點之間的父子關係所組成的樹狀結構。每個節點都可以有任意數量的子節點和一個父節點，可以使用JavaScript來查找和訪問這些節點。

簡單的HTML代碼如下：

```html
<!DOCTYPE html>
<html>
<head>
	<title>DOM</title>
</head>
<body>
	<div>
		<p>Hello World</p>
		<img src="image.jpg" alt="image">
	</div>
</body>
</html>
```

在上面的HTML代碼中，整個文檔可以看作是一個DOM樹，html元素是整個樹的根節點，head和body是html元素的子節點，div、p、img等等是body元素的子節點，以此類推。我們可以使用JavaScript來訪問和操作這些節點，例如：

```js
// 獲取body元素
var body = document.body;

// 獲取第一個p元素
var p = document.getElementsByTagName("p")[0];

// 修改p元素的文本內容
p.innerHTML = "Hello JavaScript";
```

## DOM 操作的方法和技巧

在JavaScript中，可以通過DOM API來訪問和操作HTML文檔中的元素和內容。以下是一些DOM操作的方法和技巧：

### 獲取元素
可以使用以下方法來獲取HTML文檔中的元素：

* document.getElementById(id)：根據元素的id屬性獲取元素對象。
* document.getElementsByClassName(className)：根據元素的class屬性獲取元素對象數組。
* document.getElementsByTagName(tagName)：根據元素的標籤名稱獲取元素對象數組。
* document.querySelector(selector)：使用CSS選擇器獲取符合條件的第一個元素對象。
* document.querySelectorAll(selector)：使用CSS選擇器獲取符合條件的所有元素對象數組。

### 修改元素內容

可以使用以下屬性和方法來修改元素的內容：

* innerHTML 屬性：獲取或設置元素的HTML內容。
* innerText 屬性：獲取或設置元素的文本內容。
* textContent 屬性：獲取或設置元素及其所有後代元素的文本內容。
* setAttribute(name, value) 方法：為元素設置屬性值。
* getAttribute(name) 方法：獲取元素的屬性值。

### 修改元素樣式
可以使用以下屬性和方法來修改元素的樣式：

* style 屬性：設置元素的CSS樣式，可以設置CSS屬性的名稱和值。
* className 屬性：獲取或設置元素的class屬性值。
* classList 屬性：獲取元素的class屬性對象，可以使用其提供的方法來添加、刪除和切換class。

### 添加和移除元素
可以使用以下方法來添加和移除元素：

* document.createElement(tagName)：創建一個元素節點對象。
* parentNode.appendChild(node)：在父元素的末尾添加一個子元素節點。
* parentNode.insertBefore(newNode, referenceNode)：在父元素中的某個子元素節點之前插入一個新的子元素節點。
* parentNode.removeChild(node)：從父元素中刪除一個子元素節點。

### 事件處理程序
可以使用以下方法來註冊和刪除事件處理程序：

* addEventListener(event, handler)：為元素添加一個事件處理程序。
* removeEventListener(event, handler)：從元素中刪除一個事件處理程序。

### 其他技巧

* 使用for...in循環遍歷對象的屬性和值。
* 使用setTimeout(callback, delay)和setInterval(callback, delay)函數設置定時器和間隔器。
* 使用JSON.parse(jsonString)和JSON.stringify(object)函數將JSON字符串和對象之間進行轉換。
* 使用window.location對象來獲取和設置當前網頁的URL地址。
* 使用window.history對象來獲取和設置瀏覽器的歷史記錄。
* 使用window.localStorage和window.sessionStorage對象來獲取和設置本地存儲和會話存儲的數據。

## 常用的 DOM API 和操作示例

以下是常用的 DOM API 和一些操作示例：

getElementById()：通過元素的 id 屬性獲取對應的元素節點。
javascript
Copy code
let element = document.getElementById("myElement");
getElementsByTagName()：通過元素的標籤名稱獲取對應的元素節點。
javascript
Copy code
let elements = document.getElementsByTagName("p");
getElementsByClassName()：通過元素的 class 屬性獲取對應的元素節點。
javascript
Copy code
let elements = document.getElementsByClassName("myClass");
querySelector()：通過 CSS 選擇器獲取對應的元素節點。
javascript
Copy code
let element = document.querySelector("#myElement.myClass");
querySelectorAll()：通過 CSS 選擇器獲取對應的所有元素節點。
javascript
Copy code
let elements = document.querySelectorAll(".myClass");
createElement()：創建新的元素節點。
javascript
Copy code
let newElement = document.createElement("div");
appendChild()：將元素節點添加到父元素節點的末尾。
javascript
Copy code
parentElement.appendChild(newElement);
insertBefore()：將元素節點插入到指定元素節點之前。
javascript
Copy code
parentElement.insertBefore(newElement, referenceElement);
removeChild()：從父元素節點中刪除指定的元素節點。
javascript
Copy code
parentElement.removeChild(childElement);
setAttribute()：設置元素節點的屬性值。
javascript
Copy code
element.setAttribute("class", "myClass");
getAttribute()：獲取元素節點的屬性值。
javascript
Copy code
let className = element.getAttribute("class");
classList 屬性：設置和管理元素節點的 class 屬性。
javascript
Copy code
element.classList.add("myClass");
element.classList.remove("myClass");
element.classList.toggle("myClass");
element.classList.contains("myClass");
innerHTML 屬性：設置或獲取元素節點的 HTML 內容。
javascript
Copy code
element.innerHTML = "<p>Some text</p>";
let htmlContent = element.innerHTML;
textContent 屬性：設置或獲取元素節點的純文本內容。
javascript
Copy code
element.textContent = "Some text";
let textContent = element.textContent;
style 屬性：設置或獲取元素節點的 CSS 樣式。
javascript
Copy code
element.style.color = "red";
let color = element.style.color;