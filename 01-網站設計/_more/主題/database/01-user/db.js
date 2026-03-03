import { DB } from "https://deno.land/x/sqlite/mod.ts";

let db = null

export function open() {
  db = new DB("main.db")
  db.query(`CREATE TABLE IF NOT EXISTS users 
              (id INTEGER PRIMARY KEY AUTOINCREMENT, 
               user TEXT, pass TEXT, email TEXT)`)
}

export function clear() {
  db.query(`DELETE FROM users`)
}

export function userAdd(user) {
  db.query(`INSERT INTO users (user, pass, email) 
                       VALUES (?,    ?,  ?)`, 
                       [user.user, user.pass, user.email])
}

export function userList() {
  let q = db.query(`SELECT id, user, pass, email FROM users`, [])
  let users = []
  for (let [id, user, pass, email] of q) {
    users.push({id, user, pass, email})
  }
  return users
}

export function close() {
  db.close()
}
