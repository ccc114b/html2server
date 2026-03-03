const Pos = { _order: null }

Pos.html = `
<h2 id="shopTitle"></h2>
<table id="orderTable">
<thead>
  <tr>
    <td>
      <select id="product" onchange="Pos.calcPrice()" selected="selected"></select>
    </td>
    <td>
      <select id="addon" onchange="Pos.calcPrice()" selected="selected"></select>
    </td>
    <td><input id="price" type="number" value="0"></td>
    <td>
      <input id="quantity" type="number" value="1">
      <button onclick="Pos.addItem()">新增</button>
    </td>
  </tr>
  <tr><th>商品</th><th>附加</th><th>單價</th><th>數量</th></tr>
</thead>
<tbody id="orderTableBody">
  <tr><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td></tr>
</tbody>
</table>
<br/>
<div>
  <label>總價:</label>
  <input id="totalPrice" type="number" value="0">
  <button id="submit" onclick="Pos.submit()">送出訂單</button>
  <button id="abort" onclick="Pos.abort()">放棄訂單</button>
  <br/><br/>
  <button id="newOrder" onclick="Pos.start()" disabled="disabled">新增下一筆</button>
  <br/><br/>
</div>
</div>
`

/*
Pos.goShop = function () {
  if (!Pos._order.submitted) {
    if (confirm('您的訂單尚未送出，請問是否要放棄該訂單？')) {
      Shop.start()
      return
    } else {
      return
    }
  }
  Shop.start()
}
*/
Pos.abort = function () {
  if (confirm('確定要放棄本訂單？')) {
    Pos.start()
  }
}

Pos.start = function () {
  if (!Model.isLogin()) {
    alert('您尚未登入，無法購物，請先登入！')
    fe6.router.go('#login')
    return
  }
  if (!Model.inShop()) {
    alert('您尚未選擇商店，請先選商店！')
    fe6.router.go('#market')
    return
  }
  fe6.ui.show(Pos.html)
  fe6.ui.id('shopTitle').value = Model._shop.id
  fe6.ui.id('product').innerHTML = Pos.optionList(Model._shop.products)
  fe6.ui.id('addon').innerHTML = Pos.optionList(Model._shop.addons)
  Pos._order = Pos.newOrder()
  Pos.calcPrice()
}

Pos.newOrder = function () {
  return {
    userId: Model._user.id,
    shopId: Model._shop.id,
    totalPrice: 0,
    items: [],
    submitted: false
  }
}

Pos.submit = function () {
  if (Pos._order.items.length === 0) {
    alert('您的訂單是空的，無法送出！')
    return
  }
  
  Model.saveOrder(Pos._order)
  fe6.ui.id('submit').disabled = 'disabled'
  fe6.ui.id('submit').innerHTML = '已送出'
  fe6.ui.id('abort').disabled = 'disabled'
  fe6.ui.id('newOrder').disabled = ''
}

Pos.optionList = function (list) {
  let r = []
  for (let id in list) {
    let item = list[id]
    r.push('<option value="'+id+'">'+id+'</option>')
  }
  return r.join('\n')
}

Pos.list = function () {
  let items = Pos._order.items
  let list = []
  for (let i=0; i<items.length; i++) {
    list.push(`<tr><td>${items[i].productId}</td><td>${items[i].addonId}</td><td class="number">${items[i].price}</td><td class="number">${items[i].quantity}</td></tr>`)
  }
  return list.join('\n')
}

Pos.calcPrice = function () {
  var shop = Model._shop
  let item = { product: {}, addon: {} }
  item.productId = fe6.ui.id('product').value
  item.addonId = fe6.ui.id('addon').value
  item.price = shop.products[item.productId].price + shop.addons[item.addonId].price
  fe6.ui.id('price').value = item.price
  return item
}

Pos.addItem = function () {
  let order = Pos._order
  let item = Pos.calcPrice()
  let quantity = parseFloat(fe6.ui.id('quantity').value)
  item.quantity = quantity
  order.items.push(item)
  fe6.ui.id('orderTableBody').innerHTML = Pos.list()
  order.totalPrice += item.price * item.quantity
  fe6.ui.id('totalPrice').value = order.totalPrice
}
