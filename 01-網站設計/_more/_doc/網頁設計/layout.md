# CSS 佈局

通常我們會用 DIV 標記來進行網頁的區塊性佈局，但是沒有經驗的人會很挫折，因為排版常常會變得很奇怪！

佈局時需要注意幾個屬性的設定：

1. position 定位：
    * position:fixed 可以固定該區塊在螢幕上的特定位置 (不會隨著捲動)
    * position:absolute 則是在視窗內容中的固定位置 (會隨著捲動)
2. z-index 圖層:
    * z-index 越大，代表愈上層，也就是會顯示在更前面。
    * 例如 z-index:2 會顯示在比一般區塊更前面，這樣就不會被其他區塊蓋住。
    * 不同層次之間的排版互相不會干擾。
3. div 的 float 浮動屬性：
    * float: right 會在右方浮動。
    * 若希望某區塊右方不要有其他區塊，可以用 clear:right.


## 佈局範例

* 整體佈局 -- https://www.w3schools.com/html/html_layout.asp
* 固定側欄 -- https://www.w3schools.com/howto/howto_css_fixed_sidebar.asp
* Tabs 分頁 -- https://www.w3schools.com/howto/howto_js_tabs.asp
* 頂欄 --  https://www.w3schools.com/howto/howto_js_topnav.asp

