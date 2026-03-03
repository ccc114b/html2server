Server = {}

async function get(path) {
  let r = await window.fetch(path, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json'
    }
  })
  return await r.json()
}

async function post(path, params, mode="alert") {
  let r = await window.fetch(path, {
    body: JSON.stringify(params),
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    }
  })
  if (mode != "alert") return r.status==200
  if (r.status == 200)
    alert("上傳成功！")
  else
    alert("上傳失敗: 原因是 "+r.statusText)
}

Server.orderUpload = async function() {
    let orders = []
    for (let i=1; i <= Shop.orderCount; i++) {
      let order = await Shop.getOrder(i)
      orders.push(order)
    }
    let record = {
      shop:Shop.setting.name,
      orders:orders
    }
    await post('/order/upload', record)
}

Server.login = async function(user, password) {
  return await post('/user/login', {user, password}, "silent")
}

Server.logout = async function() {
  return await post('/user/logout', {}, "silent")
}

Server.signup = async function(params) {
  return await post('/user/signup', params, "silent")
}

Server.shopSave = async function() {
  return await post('/shop/save', Shop.setting, "silent")
}

Server.shopList = async function() {
  return await get('/shops/list')
}
