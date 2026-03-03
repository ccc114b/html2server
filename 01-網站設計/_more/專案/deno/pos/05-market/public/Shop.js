const Shop = {}

Shop.setting = {
  name: '茶舖子',
  address: '金門縣金寧鄉安美村湖南 33 號',
  tel: '082-333333',
  items: {'紅茶': 20, '綠茶': 20, '珍珠奶茶': 35 },
  addons: {'去冰': 0, '半糖': 0, '熱': 0, '加鮮奶': 10 }
}

Shop.start = async function () {
  Shop.init()
  let s = Shop.setting
  s.name = await DB.get('Shop.name') || s.name
  s.address = await DB.get('Shop.address') || s.address
  s.tel = await DB.get('Shop.tel') || s.tel
  Ui.id('menuShopName').innerHTML = s.name
  const items = await DB.get('Shop.items')
  const addons = await DB.get('Shop.addons')
  if (items != null) s.items = items
  if (addons != null) s.addons = addons

  Shop.html = `
  <h1>商店資訊</h1>
  <table>
    <thead><tr><th>欄位</th><th>內容</th></tr></thead>
    <tbody>
      <tr><td>商店名稱</td><td>${s.name}</td></tr>
      <tr><td>地址</td><td>${s.address}</td></tr>
      <tr><td>電話</td><td>${s.tel}</td></tr>
      <tr><td>產品清單</td><td><pre>${JSON.stringify(s.items, null, 2)}</pre></td></tr>
      <tr><td>附加選項</td><td><pre>${JSON.stringify(s.addons, null, 2)}</pre></td></tr>
    </tbody>
  </table>
  <BR/>
  <div><button onclick="Ui.goto('#pos')">新增訂單</button> <button onclick="Ui.goto('#setting')">商店設定</button></div>
  <!--
  <div class="book">
  <OL>
  <li><a href="#pos">新增訂單</a></li>
  <li><a href="#report">銷售報表</a></li>
  <li> <a href="#setting">商店設定</a></li>
  </OL>
  </div>
  -->
  `
    Ui.show(Shop.html)
}

Shop.init = async function () {
  Shop.orderCount = await DB.get('Pos.Order.count')
  if (Shop.orderCount == null) {
    Shop.orderCount = 0
    await DB.set('Pos.Order.count', Shop.orderCount)
  }
}

Shop.incCount = async function () {
  // let orderCount = parseInt(await DB.get('Pos.Order.count')) + 1
  await DB.set('Pos.Order.count', ++ Shop.orderCount)
}

Shop.saveOrder = async function (Order) {
  await DB.set('Pos.Order.' + Shop.orderCount, Order)
}

Shop.getOrder = async function (i) {
  let order = await DB.get('Pos.Order.'+i)
  if (order == null) return null
  return order
}
