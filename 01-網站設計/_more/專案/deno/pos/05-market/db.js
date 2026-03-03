import { DB } from "https://deno.land/x/sqlite/mod.ts";
import * as bcrypt from "https://deno.land/x/bcrypt/mod.ts";

export const Db = {}

let pdb = null

Db.open = async function() {
    pdb = new DB("pos.db")
    pdb.query("CREATE TABLE IF NOT EXISTS users (id INTEGER PRIMARY KEY AUTOINCREMENT, email TEXT, user TEXT, passhash TEXT)");
    pdb.query("CREATE TABLE IF NOT EXISTS orders (id INTEGER PRIMARY KEY AUTOINCREMENT, shop TEXT, records TEXT, total_price REAL, time INTEGER)");
    pdb.query("CREATE TABLE IF NOT EXISTS shops (id INTEGER PRIMARY KEY AUTOINCREMENT, user TEXT, shop TEXT, address TEXT, tel TEXT, items TEXT, addons TEXT)");
}

Db.userSignup = async function(args) {
    let q = pdb.query('SELECT user, passhash FROM users WHERE user=?', [args.user])
    if (q.length >= 1)
        return false
    let passhash = await bcrypt.hash(args.password)
    pdb.query("INSERT INTO users (user, passhash, email) VALUES (?, ?, ?)", [args.user, passhash, args.email])
    return true
}

Db.userLogin = async function(args) {
    let q = pdb.query('SELECT user, passhash FROM users WHERE user=?', [args.user])
    if (q.length == 0) return false
    var user, passhash
    [user, passhash] = q[0]
    return (args.user == user && await bcrypt.compare(args.password, passhash))
}

Db.userList = async function() {
    let q = pdb.query('SELECT user, email FROM users', [])
    return q.map(array=>{ return {user:array[0], email:array[1]} })
}

Db.userGet = async function(user) {
    let q = pdb.query('SELECT user, email, passhash FROM users WHERE user=?', [user])
    let a = q[0]
    return {user:a[0], email:a[1], passhash:a[2]}
}

Db.shopGet = async function(shop) {
    let q = pdb.query('SELECT user, shop, address, tel, items, addons FROM shops WHERE shop=?', [shop])
    let a = q[0]
    return {user:a[0], shop:a[1], address:a[2], tel:a[3], items:a[4], addons:a[5]}
}

Db.shopSave = async function(p) {
    let q = pdb.query('SELECT shop FROM shops WHERE shop=?', [p.shop])
    if (q.length == 0)
        pdb.query("INSERT INTO shops (user, shop, address, tel, items, addons) VALUES (?, ?, ?, ?, ?, ?)", [p.user, p.shop, p.address, p.tel, JSON.stringify(p.items), JSON.stringify(p.addons)])
    else
        pdb.query("UPDATE shops SET address=?, tel=?, items=?, addons=? WHERE shop=?", [p.address, p.tel, JSON.stringify(p.items), JSON.stringify(p.addons), p.shop])
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
    pdb.query("INSERT INTO orders (shop, records, total_price, time) VALUES (?, ?, ?, ?)", [order.shop, JSON.stringify(order.records), order.totalPrice, order.time])
}

Db.orderQuery = async function(shop) {
    let q = pdb.query('SELECT id, shop, records, total_price, time FROM orders')
    let list = []
    for (const [id, shop, records, total_price, time] of q) {
      list.push({id, shop, records:JSON.parse(records), total_price, time})
    }
    return list
}

Db.orderList = async function(shop) {
    return Db.orderQuery(shop)
}

Db.close = async function() {
    pdb.close()
}