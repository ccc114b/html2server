const Home = {}

Home.html = `
<h1>網路開店系統</h1>

<div class="book">
<OL>
<li><a href="#signup">註冊</a></li>
<li><a href="#login">登入</a></li>
<li><a href="#setting">設定商店與產品</a></li>
<li><a href="#pos">開始販售</a></li>
<li><a href="#report">查看報表</a></li>
</OL>
</div>
`

Home.start = function () {
  Ui.show(Home.html)
}
