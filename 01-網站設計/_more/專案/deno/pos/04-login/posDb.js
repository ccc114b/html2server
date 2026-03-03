import { DB } from "https://deno.land/x/sqlite/mod.ts";

export const posDb = {}

let db = null
  
posDb.open = function() {
    db = new DB("pos.db")
    db.query("CREATE TABLE IF NOT EXISTS users (id INTEGER PRIMARY KEY AUTOINCREMENT, email TEXT, user TEXT, password TEXT)");
    db.query("CREATE TABLE IF NOT EXISTS orders (id INTEGER PRIMARY KEY AUTOINCREMENT, shop TEXT, records TEXT, total_price REAL, time INTEGER)");
}

posDb.saveOrder = function(order) {
    db.query("INSERT INTO orders (shop, records, total_price, time) VALUES (?, ?, ?, ?)", [order.shop, JSON.stringify(order.records), order.totalPrice, order.time])
}

posDb.queryOrder = function(shop) {
    let q = db.query('SELECT id, shop, records, total_price, time FROM orders')
    let list = []
    for (const [id, shop, records, total_price, time] of q) {
      list.push({id, shop, records:JSON.parse(records), total_price, time})
    }
    return list
}

posDb.listOrder = function(shop) {
    return posDb.queryOrder(shop)
}

posDb.login = function(params) {
    console.log('posDb.login:params=', params)
    let q = db.query('SELECT user, password FROM users WHERE user=?', [params.user])
    console.log('posDb.login:q=', q)
    if (q.length == 0) return false
    var user, password
    [user, password] = q[0]
    console.log('user=', user, 'password=', password)
    return (params.user == user && params.password == password)
}

posDb.signup = function(params) {
    let q = db.query('SELECT user, password FROM users WHERE user=?', [params.user])
    console.log('posDb.signup:q=', q)
    if (q.length >= 1)
        return false
    db.query("INSERT INTO users (user, password, email) VALUES (?, ?, ?)", [params.user, params.password, params.email])
    return true
}

posDb.userList = async function() {
    let q = db.query('SELECT user FROM users', [])
    console.log('posDb.userList:q=', q)
    let list = []
    for (const [user] of q) {
      list.push({user})
    }
    return list
}