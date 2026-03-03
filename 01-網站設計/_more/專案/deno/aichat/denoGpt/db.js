import { DB } from "https://deno.land/x/sqlite/mod.ts";

let db = null
const NLIMIT = 100

export async function open() {
  db = new DB("denogpt.db")
  db.query(`CREATE TABLE IF NOT EXISTS users 
              (uid INTEGER PRIMARY KEY AUTOINCREMENT, 
               user TEXT, pass TEXT, email TEXT, quota INTEGER)`)
  db.query(`CREATE TABLE IF NOT EXISTS chats 
              (cid TEXT, user TEXT, query TEXT, response TEXT)`)
  db.query(`CREATE INDEX IF NOT EXISTS iUsers
              ON users (uid, user);`)
  db.query(`CREATE INDEX IF NOT EXISTS iChats
              ON chats (cid, user);`)
}

export async function clear() {
  db.query(`DELETE FROM users`)
  db.query(`DELETE FROM chats`)
}

export async function close() {
  db.close()
}

export async function userAdd(user) {
  db.query(`INSERT INTO users (user, pass, email, quota) VALUES (?,?,?,?)`,
    [user.user, user.pass, user.email])
}

export async function userGet(user1) {
  let q = db.query(`SELECT uid, user, pass, email FROM users 
                    WHERE user=?`, [user1])
  console.log(`userGet(${user1})=${q}`)
  if (q.length <= 0) return null
  let [uid, user, pass, email] = q[0]
  return { uid, user, pass, email }
}

export async function userList() {
  let q = db.query(`SELECT user FROM users`, [])
  let users = []
  for (let [user] of q) {
    users.push(user)
  }
  return users
}

export async function chatAdd(c) {
  console.log('chatAdd:c=', c)
  db.query(`INSERT INTO chats (cid, user, query, response) VALUES (?,?,?,?)`,
    [c.cid, c.user, JSON.stringify(c.query), JSON.stringify(c.response)])
}

export async function chatGet(cid) {
  let r = db.query(`SELECT cid, user, query, response FROM chats WHERE cid = ?`, [cid])
  let list = []
  for (let [cid, user, query, response] of r) {
    list.push({cid, user, query:JSON.parse(query), response:JSON.parse(response)})
  }
  return list[0]
}

export async function chatList(user) {
  let r = db.query(`SELECT cid, user, query, response FROM chats WHERE user = ?`, [user])
  let list = []
  for (let [cid, user, query, response] of r) {
    list.push({cid, user, query:JSON.parse(query), response:JSON.parse(response)})
  }
  return list
}

