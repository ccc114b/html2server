const Shop = {
  name: '茶舖子',
  address: '金門縣金寧鄉安美村湖南 33 號',
  tel: '082-333333',
  items: {'紅茶': 20, '綠茶': 20, '珍珠奶茶': 35 },
  addons: {'去冰': 0, '半糖': 0, '熱': 0, '加鮮奶': 10 },
  orderCount: 0,
}

Shop.html = `
<h1>我的商店</h1>
<div class="book">
<OL>
<li><a href="#pos">新增訂單</a></li>
<li><a href="#report">銷售報表</a></li>
<li> <a href="#setting">商店設定</a></li>
</OL>
</div>
`

/*
<div>
  <a href="#pos">新增訂單</a><br/><br/>
  <a href="#report">銷售報表</a><br/><br/>
  <a href="#setting">商店設定</a><br/><br/>
</div>

Shop.html = `
<div>
  <button class="big" onclick="Pos.start()">新增訂單</button><br/><br/>
  <button class="big" onclick="Report.start()">本日報表</button><br/><br/>
  <button class="big" onclick="Setting.start()">商店設定</button><br/><br/>
</div>
`
*/

Shop.start = async function () {
  Shop.init()
  Shop.name = await DB.get('Shop.name') || Shop.name
  Shop.address = await DB.get('Shop.address') || Shop.address
  Shop.tel = await DB.get('Shop.tel') || Shop.tel
  Ui.id('menuShopName').innerHTML = Shop.name
  const items = await DB.get('Shop.items')
  const addons = await DB.get('Shop.addons')
  if (items != null) Shop.items = items
  if (addons != null) Shop.addons = addons
  Ui.show(Shop.html)
}

Shop.init = async function () {
  Shop.orderCount = await DB.get('Pos.Order.count')
  console.log('Shop.orderCount=', Shop.orderCount)
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
