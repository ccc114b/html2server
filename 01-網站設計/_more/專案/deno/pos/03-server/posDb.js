import { DB } from "https://deno.land/x/sqlite/mod.ts";

export const posDb = {}

let db = null
  
posDb.open = function() {
    db = new DB("pos.db")
    db.query("CREATE TABLE IF NOT EXISTS pos_order (id INTEGER PRIMARY KEY AUTOINCREMENT, shop TEXT, records TEXT, total_price REAL, time INTEGER)");
}

posDb.saveOrder = function(order) {
    db.query("INSERT INTO pos_order (shop, records, total_price, time) VALUES (?, ?, ?, ?)", [order.shop, JSON.stringify(order.records), order.totalPrice, order.time])
}

posDb.queryOrder = function(shop) {
    let q = db.query('SELECT id, shop, records, total_price, time FROM pos_order')
    let list = []
    for (const [id, shop, records, total_price, time] of q) {
      list.push({id, shop, records:JSON.parse(records), total_price, time})
    }
    return list
}

posDb.listOrder = function(shop) {
    return posDb.queryOrder(shop)
}
