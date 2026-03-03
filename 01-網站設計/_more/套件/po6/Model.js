const Model = {
  _orders: [],
  shops: [
    {
      id: '茶舖子',
      owner: 'kitty',
      name: '茶舖子',
      address: '金門縣金寧鄉安美村湖南 33 號',
      tel: '082-333333',
      productList: [
        {id:'紅茶', price:20},
        {id:'綠茶', price:20}, 
        {id:'珍珠奶茶', price:35},
      ],
      addonList: [
        {id:'去冰', price:0},
        {id:'半糖', price:0}, 
        {id:'熱', price:0},
        {id:'加鮮奶', price:10},
      ],
    },
    {
      id: '寵物之家',
      owner: 'snoopy',
      name: '寵物之家',
      address: '金門縣金寧鄉安美村湖南 77 號',
      tel: '082-777777',
      productList: [
        {id:'白天貓狗寄養', price:300},
      ],
      addonList: [
        {id:'不含夜間', price:0},
        {id:'含夜間', price:200},
      ],
    },
    {
      id: '金門照護之家',
      owner: 'snoopy',
      name: '金門照護之家',
      address: '金門縣金寧鄉安美村湖南 88 號',
      tel: '082-8888888',
      productList: [
        {id:'自行送來(白天)', price:1200},
        {id:'到府照料(白天)', price:2000},
        {id:'自行送來(日夜)', price:2000},
        {id:'到府照料(日夜)', price:3000},
      ],
      addonList: [
        {id:'自帶棉被', price:-200},
        {id:'不自帶棉被', price:0},
      ],
    },
  ],
  users: [
    {
      type: 'administrator',
      id: 'ccc',
      password: 'ccc123',
      name: '陳鍾誠',
      email: 'ccckmit@gmail.com',
      tel: '082-333333',
      shops: [],
    },
    {
      id: 'kitty',
      password: 'kitty123',
      name: '凱蒂貓',
      email: 'kitty@gmail.com',
      tel: '082-5555555',
      shops: [ 
        {id:'茶舖子' }
      ],
    },
    {
      id: 'snoopy',
      password: 'snoopy123',
      name: '史奴比',
      email: 'snoopy@gmail.com',
      tel: '082-7777777',
      shops: [ 
        {id:'寵物之家' },
        {id:'金門照護之家' }
      ],
    },
  ]
}

Model.init = function () {
  for (var shop of Model.shops) Model.saveShop(shop)
  for (var user of Model.users) Model.saveUser(user)
  Model.loadLocal()
}

Model.saveShop = function (shop) {
  // delete shop.products
  // delete shop.addons
  fe6.db.save(`shop.${shop.id}`, shop)
}

Model.loadShop = function (id) {
  var shop = Model._shop = fe6.db.load(`shop.${id}`)
  console.log('shop=', shop)
  shop.products = fe6.tb.toMap(shop.productList, 'id')
  shop.addons = fe6.tb.toMap(shop.addonList, 'id')
  return shop
}

Model.saveUser = function (user) {
  fe6.db.save(`user.${user.id}`, user)
}

Model.loadUser = function (id) {
  var user = Model._user = fe6.db.load(`user.${id}`)
  console.log('user=', user)
  return user
}

Model.saveOrder = function (order) {
  order.time = Date.now()
  order.id = fe6.lib.guid()
  Model._orders.push(order)
  fe6.db.save(`order.${order.id}`, order)
}

Model.loadOrder = function (id) {
  var order = fe6.db.load(`order.${id}`)
  console.log('order=', order)
  return order
}

Model.logout = function() {
  Model._user = null
}

Model.login = function(id, password) {
  var user = Model.loadUser(id)
  var isPass = (user != null && user.password == password)
  if (isPass) Model._user = user
  return isPass
}

Model.isLogin = function() {
  return Model._user != null
}

Model.inShop = function() {
  return Model._shop != null
}

Model.saveLocal = function () {
  if (Model._user != null) fe6.db.saveLocal('user', Model._user)
  if (Model._shop != null) fe6.db.saveLocal('shop', Model._shop)
}

Model.loadLocal = function() {
  Model._user = fe6.db.loadLocal('user')
  Model._shop = fe6.db.loadLocal('shop')
}
