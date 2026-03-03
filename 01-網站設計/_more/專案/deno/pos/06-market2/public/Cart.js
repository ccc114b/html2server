const Cart = {}

Cart.html = `
  <h1>購物車</h1>
  <div id="report" class="panel">
    <table>
      <thead><tr><th>代號</th><th>金額</th><th>日期</th><th>時間</th></tr></thead>
      <tbody id="reportBody"></tbody>
    </table>
    <br/>
    <div class="center">
      <label>總收入：</label>
      <label id="dayTotal"></label>
      <br/><br/>
      <button onclick="Cart.clear()">清除</button>
      <button onclick="Cart.upload()">上傳</button>
      <button onclick="Ui.goto('#shop')">回商店</button>
    </div>
  </div>
  <div id="detail" class="panel" style="display:none">
    <table>
      <thead><tr><th>商品</th><th>單價</th><th>數量</th></tr></thead>
      <tbody id="detailBody"></tbody>
    </table>
    <br/>
    <div>
      <label>總價:</label><label id="totalPrice"></label>
      <br/><br/>
      <button onclick="Ui.showPanel('report')">回到報表</button>
    </div>
  </div>
`

Cart.start = function () {
  Shop.init()
  Ui.show(Cart.html)
  Cart.showReport()
}

Cart.showReport = async function () {
  Ui.id('reportBody').innerHTML = await Cart.orderListHtml()
  Ui.id('dayTotal').innerHTML = Cart.dayTotal + ''
}

Cart.showDetail = async function (i) {
  Ui.showPanel('detail')
  let order = await Shop.getOrder(i)
  Ui.id('detailBody').innerHTML = Cart.orderDetailHtml(order)
  Ui.id('totalPrice').innerHTML = order.totalPrice
}

Cart.orderListHtml = async function () {
  list = []
  let dayTotal = 0
  for (let i=1; i <= Shop.orderCount; i++) {
    let order = await Shop.getOrder(i)
    dayTotal += order.totalPrice
    list.push(Cart.orderRowHtml(i, order))
  }
  Cart.dayTotal = dayTotal
  return list.join('\n')
}

Cart.orderRowHtml = function (i, order) {
  let time = new Date(order.time)
  return '<tr><td><a onclick="Cart.showDetail('+i+')">0' + i + '</a></td><td class="number">' + order.totalPrice + '</td><td>' + Lib.dateToString(time) + '</td><td>' + Lib.timeToString(time) + '</td></tr>'
}

Cart.orderDetailHtml = function (order) {
  let detail = []
  let records = order.records
  for (let i=0; i<records.length; i++) {
    let r = records[i]
    detail.push('<tr><td>' + r.name + '</td><td>' + r.price + '</td><td>' + r.quantity + '</td></tr>')
  }
  return detail.join('\n')
}

Cart.clear = async function () {
  localStorage.clear()
  await Shop.init()
  await Cart.showReport()
}

Cart.upload = async function () {
  Server.orderUpload()
}

Cart.saveOrder = async function (Order) {
    await Cache.set('Pos.Order.' + Shop.orderCount, Order)
}
  
Cart.getOrder = async function (i) {
    let order = await Cache.get('Pos.Order.'+i)
    if (order == null) return null
    return order
}
