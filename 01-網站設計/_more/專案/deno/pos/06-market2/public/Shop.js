const Shop = {}

Shop.setting = {
  shop: '茶舖子',
  address: '金門縣金寧鄉安美村湖南 33 號',
  tel: '082-333333',
  items: {'紅茶': 20, '綠茶': 20, '珍珠奶茶': 35 },
  addons: {'去冰': 0, '半糖': 0, '熱': 0, '加鮮奶': 10 }
}

Shop.start = async function (shop) {
  shop = shop || Shop.setting.shop
  console.log('Shop.start:shop=', shop)
  Shop.init()
  Shop.setting = await Server.shopGet(shop)
  let s = Shop.setting
  Ui.id('menuShopName').innerText = s.shop
  /*
  s.name = await Cache.get('Shop.name') || s.name
  s.address = await Cache.get('Shop.address') || s.address
  s.tel = await Cache.get('Shop.tel') || s.tel
  Ui.id('menuShopName').innerHTML = s.name
  const items = await Cache.get('Shop.items')
  const addons = await Cache.get('Shop.addons')
  if (items != null) s.items = items
  if (addons != null) s.addons = addons
  */
  Shop.html = `
  <h1>商店資訊</h1>
  <table>
    <thead><tr><th>欄位</th><th>內容</th></tr></thead>
    <tbody>
      <tr><td>商店名稱</td><td>${s.shop}</td></tr>
      <tr><td>地址</td><td>${s.address}</td></tr>
      <tr><td>電話</td><td>${s.tel}</td></tr>
      <tr><td>產品清單</td><td><pre>${JSON.stringify(s.items, null, 2)}</pre></td></tr>
      <tr><td>附加選項</td><td><pre>${JSON.stringify(s.addons, null, 2)}</pre></td></tr>
    </tbody>
  </table>
  <BR/>
  <div><button onclick="Ui.goto('#pos')">新增訂單</button> <button onclick="Ui.goto('#setting')">商店設定</button></div>
  `
    Ui.show(Shop.html)
}

Shop.init = async function () {
  Shop.orderCount = await Cache.get('Pos.Order.count')
  if (Shop.orderCount == null) {
    Shop.orderCount = 0
    await Cache.set('Pos.Order.count', Shop.orderCount)
  }
}
/*
Shop.incCount = async function () {
  // let orderCount = parseInt(await Cache.get('Pos.Order.count')) + 1
  await Cache.set('Pos.Order.count', ++ Shop.orderCount)
}

Shop.saveOrder = async function (Order) {
  await Cache.set('Pos.Order.' + Shop.orderCount, Order)
}

Shop.getOrder = async function (i) {
  let order = await Cache.get('Pos.Order.'+i)
  if (order == null) return null
  return order
}
*/