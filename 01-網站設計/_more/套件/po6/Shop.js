const Shop = {}

Shop.html = `
<h2>商店資料</h2>
<table>
  <thead><tr><th>欄位</th><th>內容</th></tr></thead>
  <tbody>
    <tr><td>商店代號</td><td><input id="shopId" type="text" value=""/></td></tr>
    <tr><td>商店名稱</td><td><input id="shopName" type="text" value=""/></td></tr>
    <tr><td>地址</td><td><input id="shopAddress" type="text" value=""/></td></tr>
    <tr><td>電話</td><td><input id="shopTel" type="text" value=""/></td></tr>
  </tbody>
</table>

<a href="#pos">進入本商店購物系統</a>

<h2>商品</h2>
<div id="products">
</div>
<h2>附加</h2>
<div id="addons">
</div>
<p><button onclick="Shop.save()">儲存設定</button></p>
`

Shop.start = function (id) {
  var shop = Model.loadShop(id)
  Model.saveLocal()
//  shop.productList = fe6.tb.toList(shop.products)
//  shop.addonList = fe6.tb.toList(shop.addons)
  fe6.ui.show(Shop.html)
  fe6.ui.id('shopId').value = shop.id
  fe6.ui.id('shopName').value = shop.name
  fe6.ui.id('shopAddress').value = shop.address
  fe6.ui.id('shopTel').value = shop.tel
  Shop.productArgs = {
    id: 'productTable',
    fields: ["id", "price", "deleted"],
    titles: ["商品", "單價", "刪除"],
    types: ["string", "number", "boolean"],
    records: shop.productList,
    editable:true,
  }
  Shop.addonArgs = {
    id: 'addonTable',
    fields: ["id", "price", "deleted"],
    titles: ["附加", "單價", "刪除"],
    types: ["string", "number", "boolean"],
    records: shop.addonList,
    editable:true,
  }
  fe6.tb.attachTo('#products', Shop.productArgs)
  fe6.tb.attachTo('#addons', Shop.addonArgs)
  // Shop._shop = shop
}

Shop.save = function () {
  var shop = Model._shop
  try {
    shop.name = fe6.ui.id('shopName').value
    shop.address = fe6.ui.id('shopAddress').value
    shop.tel = fe6.ui.id('shopTel').value
    fe6.tb.updateRecords(Shop.productArgs)
    fe6.tb.updateRecords(Shop.addonArgs)
    // shop.products = JSON.parse(fe6.ui.id('products').value)
    // shop.addons = JSON.parse(fe6.ui.id('addons').value)
  } catch (error) {
    alert('儲存失敗，請檢查格式是否有錯！\n', error)
    return
  }
  Model.saveShop(shop)
  alert('儲存成功！')
}