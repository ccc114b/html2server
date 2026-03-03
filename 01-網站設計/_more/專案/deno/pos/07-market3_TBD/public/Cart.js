const Cart = {}

Cart.html = `
  <h1>購物車</h1>
  <div id="report" class="panel">
    <table>
      <thead><tr>
        <td>
          <select   style="width:100%">
            <option value="">全選</option>
            <option value="">全取消</option>
          </select>
        </td>
        <td>
          
        </td>
        <td>
          <select   style="width:100%">
            <option value="">全部商店</option>
            <option value="">商店A</option>
            <option value="">商店B</option>
          </select>
        </td>
        <td>
          <input type="text" class="short" placeholder="過濾關鍵字"/>
        </td>
        <td>
          <select   style="width:100%">
            <option value="">不排序</option>
            <option value="">高=>低</option>
            <option value="">低=>高</option>
          </select>
        </td>
        <td colspan="2">
          <select  style="width:100%">
            <option value="">不排序</option>
            <option value="">遠=>近</option>
            <option value="">近=>遠</option>
          </select>
        </td>
        </tr></thead>
      <thead><tr><th>選取</th><th>代號</th><th>商店</th><th>產品</th><th>金額</th><th>日期</th><th>時間</th></tr></thead>
      <tbody id="reportBody"></tbody>
    </table>
    <br/>
    <div class="center">
      <label>總收入：</label>
      <label id="total"></label>
      <br/><br/>
      <button onclick="Cart.clear()">刪除</button>
      <button onclick="Cart.upload()">確認購買</button>
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
  Ui.id('total').innerHTML = Cart.total + ''
}

Cart.showDetail = async function (key) {
  Ui.showPanel('detail')
  let order = await Cache.get(key)
  Ui.id('detailBody').innerHTML = Cart.orderDetailHtml(order)
  Ui.id('totalPrice').innerHTML = order.totalPrice
}

Cart.orderListHtml = async function () {
  let orders = []
  let total = 0
  let i = 0
  let user = await Cache.get('user')
  for (var key in localStorage){
    if (!key.startsWith("Order.")) continue
    let order = await Cache.get(key)
    if (order.user != user) continue
    total += order.totalPrice
    orders.push(order)
  }
  orders = orders.sort((a,b)=>(a.time - b.time))
  console.log(orders)
  let rows = []
  for (var order of orders){
    rows.push(Cart.orderRowHtml(++i, order))
  }
  Cart.total = total
  return rows.join('\n')
}

Cart.orderRowHtml = function (i, order) {
  let time = new Date(order.time)
  return `<tr><td><input type="checkbox"/></td><td><a onclick="Cart.showDetail('Order.${order.guid}')">0${i}</a></td>
              <td>${order.shop}</td>
              <td>${order.records[0].name}...</td>
              <td class="number">${order.totalPrice}</td>
              <td>${Lib.dateToString(time)}</td>
              <td>${Lib.timeToString(time)}</td>
          </tr>`
}

Cart.orderDetailHtml = function (order) {
  let detail = []
  let records = order.records
  for (let i=0; i<records.length; i++) {
    let r = records[i]
    detail.push(`<tr><td>${r.name}</td><td>${r.price}</td><td>${r.quantity}</td></tr>`)
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
    await Cache.set('Order.' + Order.guid, Order)
}

