const Cart = {}

Cart.html = `
  <h2>我的購物車</h2>
  <div id="report" class="panel">
    <table>
      <thead><tr><th>序號</th><th>商店</th><th>金額</th><th>日期</th><th>時間</th></tr></thead>
      <tbody id="reportBody"></tbody>
    </table>
    <div class="center">
      <label>總金額：</label>
      <label id="dayTotal"></label>
    </div>
    <p><button onclick="Cart.checkout()">確認結帳</button></p>
  </div>
  <div id="detail" class="panel" style="display:none">
    <table>
      <thead><tr><th>商品</th><th>附加</th><th>單價</th><th>數量</th></tr></thead>
      <tbody id="detailBody"></tbody>
    </table>
    <div>
      <p>總價：<label id="totalPrice"></label></p>
      <p><a onclick="fe6.ui.showPanel('report')"> <i class="fa fa-arrow-left" aria-hidden="true"></i> 回購物車</a></p>
    </div>
  </div>
`

Cart.start = function () {
  fe6.ui.show(Cart.html)
  Cart.showReport()
}

Cart.showReport = function () {
  fe6.ui.id('reportBody').innerHTML = Cart.orderListHtml()
  fe6.ui.id('dayTotal').innerHTML = Cart.dayTotal + ''
}

Cart.showDetail = function (id) {
  fe6.ui.showPanel('detail')
  let order = Model.loadOrder(id)
  fe6.ui.id('detailBody').innerHTML = Cart.orderDetailHtml(order)
  fe6.ui.id('totalPrice').innerHTML = order.totalPrice
}

Cart.orderListHtml = function () {
  list = []
  let dayTotal = 0
  var orders = Model._orders
  var len = orders.length
  for (var i=0; i<len; i++) {
    dayTotal += orders[i].totalPrice
    list.push(Cart.orderRowHtml(i, orders[i]))
  }
  Cart.dayTotal = dayTotal
  return list.join('\n')
}

Cart.orderRowHtml = function (i, order) {
  let time = new Date(order.time)
  return `<tr><td><a onclick="Cart.showDetail('${order.id}')">${i}</a></td><td>${order.shopId}</td><td class="number">${order.totalPrice}</td><td>${fe6.lib.dateToString(time)}</td><td>${fe6.lib.timeToString(time)}</td></tr>`
}

Cart.orderDetailHtml = function (order) {
  let detail = []
  let items = order.items
  for (let i=0; i<items.length; i++) {
    let item = items[i]
    detail.push('<tr><td>' + item.productId + '</td><td>' + item.addonId + '</td><td>' + item.price + '</td><td>' + item.quantity + '</td></tr>')
  }
  return detail.join('\n')
}

