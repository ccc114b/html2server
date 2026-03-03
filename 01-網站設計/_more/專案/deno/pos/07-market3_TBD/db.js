import { DB } from "https://deno.land/x/sqlite/mod.ts";
import * as bcrypt from "https://deno.land/x/bcrypt/mod.ts";

export const Db = {}

let pdb = null

Db.open = async function() {
    pdb = new DB("pos.db")
    pdb.query("CREATE TABLE IF NOT EXISTS users (id INTEGER PRIMARY KEY AUTOINCREMENT, email TEXT, user TEXT, passhash TEXT)");
    pdb.query("CREATE TABLE IF NOT EXISTS orders (id INTEGER PRIMARY KEY AUTOINCREMENT, user TEXT, shop TEXT, records TEXT, totalPrice REAL, time INTEGER)");
    pdb.query("CREATE TABLE IF NOT EXISTS shops (id INTEGER PRIMARY KEY AUTOINCREMENT, user TEXT, shop TEXT, address TEXT, tel TEXT, items TEXT, addons TEXT)");
}

Db.userQuery = async function(filter="", args=[]) {
    let q = pdb.query('SELECT id, user, email, passhash FROM users '+filter, args)
    let list = []
    for (const [id, user, email, passhash] of q) {
      list.push({id, user, email, passhash})
    }
    console.log(`userQuery:filter=${filter} args=${args} list=${JSON.stringify(list)}`)
    return list
}

Db.userSignup = async function(args) {
    let q = Db.userQuery('WHERE user=?', [args.user])
    // let q = pdb.query('SELECT user, passhash FROM users WHERE user=?', [args.user])
    if (q.length >= 1) return false
    let passhash = await bcrypt.hash(args.password)
    pdb.query("INSERT INTO users (user, passhash, email) VALUES (?, ?, ?)", [args.user, passhash, args.email])
    return true
}

Db.userLogin = async function(args) {
    let q = await Db.userQuery('WHERE user=?', [args.user])
    // let q = pdb.query('SELECT user, passhash FROM users WHERE user=?', [args.user])
    if (q.length == 0) return false
    let {user, passhash} = q[0]
    return (args.user == user && await bcrypt.compare(args.password, passhash))
}

Db.userList = async function() {
    return await Db.userQuery()
    // let q = pdb.query('SELECT user, email FROM users', [])
    // return q.map(array=>{ return {user:array[0], email:array[1]} })
}

Db.userGet = async function(user) {
    let list = await Db.userQuery("WHERE user=?", [user])
    return list[0]
    // let q = pdb.query('SELECT user, email, passhash FROM users WHERE user=?', [user])
    // let a = q[0]
    // return {user:a[0], email:a[1], passhash:a[2]}
}

Db.shopQuery = async function(filter="", args=[]) {
    let q = pdb.query('SELECT id, user, shop, address, tel, items, addons FROM shops '+filter, args)
    let list = []
    for (const [id, user, shop, address, tel, items, addons] of q) {
      list.push({id, user, shop, address, tel, items:JSON.parse(items), addons:JSON.parse(addons)})
    }
    return list
}

Db.shopGet = async function(shop) {
    let list = await Db.shopQuery(" WHERE shop=?", [shop])
    if (list.length == 0) return null
    return list[0]
}

/*
Db.shopGet = async function(shop) {
    let q = pdb.query('SELECT user, shop, address, tel, items, addons FROM shops WHERE shop=?', [shop])
    if (q.length == 0) return null
    let a = q[0]
    let s = {user:a[0], shop:a[1], address:a[2], tel:a[3], items:a[4], addons:a[5]}
    s.items = JSON.parse(s.items)
    s.addons = JSON.parse(s.addons)
    return s
}
*/

Db.shopSave = async function(shop) {
    let p = {...shop}
    p.items = JSON.stringify(p.items)
    p.addons = JSON.stringify(p.addons)
    let q = pdb.query('SELECT shop FROM shops WHERE shop=?', [p.shop])
    if (q.length == 0)
        pdb.query("INSERT INTO shops (user, shop, address, tel, items, addons) VALUES (?, ?, ?, ?, ?, ?)", [p.user, p.shop, p.address, p.tel, p.items,p.addons])
    else
        pdb.query("UPDATE shops SET address=?, tel=?, items=?, addons=? WHERE shop=?", [p.address, p.tel, p.items, p.addons, p.shop])
}

Db.shopList = async function() {
    let q = pdb.query('SELECT user, shop FROM shops', [])
    let list = []
    for (const [user, shop] of q) {
      list.push({user, shop})
    }
    return list
}

Db.orderSave = async function(order) {
    pdb.query("INSERT INTO orders (user, shop, records, totalPrice, time) VALUES (?, ?, ?, ?, ?)", [order.user, order.shop, JSON.stringify(order.records), order.totalPrice, order.time])
}

Db.orderQuery = async function(filter="", args=[]) {
    let q = pdb.query('SELECT id, user, shop, records, totalPrice, time FROM orders '+filter, args)
    let list = []
    for (const [id, user, shop, records, totalPrice, time] of q) {
      list.push({id, user, shop, records:JSON.parse(records), totalPrice, time})
    }
    return list
}

Db.orderList = async function() {
    return Db.orderQuery()
}
/*
Db.shopOrderList = async function(shop) {
    return Db.orderQuery('WHERE shop=?', [shop])
}

Db.userOrderList = async function(user) {
    return Db.orderQuery('WHERE user=?', [user])
}
Db.orderList = async function(shop) {
    return Db.orderQuery(shop)
}
*/

Db.close = async function() {
    pdb.close()
}