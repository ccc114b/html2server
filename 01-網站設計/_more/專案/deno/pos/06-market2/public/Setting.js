const Setting = {}

Setting.html = `
<h1>商店設定</h1>
<table>
  <thead><tr><th>欄位</th><th>內容</th></tr></thead>
  <tbody>
    <tr><td>商店名稱</td><td><input id="shopName" type="text" value=""/></td></tr>
    <tr><td>地址</td><td><input id="shopAddress" type="text" value=""/></td></tr>
    <tr><td>電話</td><td><input id="shopTel" type="text" value=""/></td></tr>
    <tr><td>產品清單</td><td><textarea id="items"></textarea></td></tr>
    <tr><td>附加選項</td><td><textarea id="addons"></textarea></td></tr>
  </tbody>
</table>
<br/>
<button onclick="Setting.save()">儲存在本機</button>
<button onclick="Server.shopSave()">上傳到網站</button>
<button onclick="Ui.goto('#shop')">回商店</button>
`

Setting.start = function () {
  Shop.init()
  Ui.show(Setting.html)
  let s = Shop.setting
  Ui.id('shopName').value = s.shop
  Ui.id('shopAddress').value = s.address
  Ui.id('shopTel').value = s.tel
  Ui.id('items').value = JSON.stringify(s.items, null, 2)
  Ui.id('addons').value = JSON.stringify(s.addons, null, 2)
}

Setting.save = async function () {
  let s = Shop.setting
  try {
    s.shop = Ui.id('shopName').value
    s.address = Ui.id('shopAddress').value
    s.tel = Ui.id('shopTel').value
    s.items = JSON.parse(Ui.id('items').value)
    s.addons = JSON.parse(Ui.id('addons').value)
  } catch (error) {
    alert('儲存失敗，請檢查格式是否有錯！\n', error)
    return
  }
  await Cache.set('Shop.shop', s.shop)
  await Cache.set('Shop.address', s.address)
  await Cache.set('Shop.tel', s.tel)
  await Cache.set('Shop.items', s.items)
  await Cache.set('Shop.addons', s.addons)
  Ui.id('menuShopName').innerHTML = s.shop
  alert('儲存成功！')
}