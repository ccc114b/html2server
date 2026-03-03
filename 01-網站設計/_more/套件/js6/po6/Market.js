const Market = {}

Market.html = `
<h2>商店市場</h2>
<form action="/search" method="post">
  <p><input type="text" placeholder="query" name="query"><input type="submit" value="搜尋"></p>
</form>
<h2>商店列表</h2>
<ol>
  <li><a href="#shop/茶舖子">茶舖子</a></li>
  <li><a href="#shop/寵物之家">寵物之家</a></li>
  <li><a href="#shop/金門照護之家">金門照護之家</a></li>
</ol>
<h2>店主列表</h2>
<ol>
  <li><a href="#user/snoopy">snoopy</a></li>
  <li><a href="#user/kitty">kitty</a></li>
</ol>
`

Market.start = function () {
  fe6.ui.show(Market.html)
}