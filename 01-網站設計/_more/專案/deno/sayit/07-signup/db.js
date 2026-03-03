import { DB } from "https://deno.land/x/sqlite/mod.ts";

let db = null

export async function open() {
  db = new DB("say.db");
  db.query(`CREATE TABLE IF NOT EXISTS users 
              (id INTEGER PRIMARY KEY AUTOINCREMENT, 
               user TEXT, pass TEXT, email TEXT)`)
  db.query(`CREATE TABLE IF NOT EXISTS follows
              (id INTEGER PRIMARY KEY AUTOINCREMENT, 
               follower TEXT, user TEXT)`)
  db.query(`CREATE TABLE IF NOT EXISTS says 
              (id INTEGER PRIMARY KEY AUTOINCREMENT, 
               msg TEXT, ufrom TEXT, uto TEXT, 
               comments TEXT, time INTEGER)`)
}

export async function clear() {
  db.query(`DELETE FROM users`)
  db.query(`DELETE FROM says`)
  db.query(`DELETE FROM follows`)
}

export async function close() {
  db.close()
}

export async function userAdd(user) {
  db.query(`INSERT INTO users (user, pass, email) 
                       VALUES (?,    ?,  ?)`, 
                       [user.user, user.pass, user.email])
}

export async function userGet(user1) {
  let q = db.query(`SELECT id, user, pass, email FROM users WHERE user=?`, [user1])
  console.log(`userGet(${user1})=${q}`)
  if (q.length <=0) return null
  let [id, user, pass, email] = q[0]
  return {id, user, pass, email}
}

export async function userList() {
  let q = db.query(`SELECT user FROM users`, [])
  let users = []
  for (let [user] of q) {
    users.push(user)
  }
  return users
}

export async function sayAdd(say) {
  db.query(`INSERT INTO says (msg, ufrom, uto, comments, time) 
                      VALUES (?,   ?,     ?,   ?,        ?)`, 
                      [say.msg, say.ufrom, say.uto, say.comments, Date.now()])
}

export async function sayBy(uto) {
  let q = db.query(`SELECT id, msg, ufrom, uto, comments, time
            FROM says WHERE uto=?`, [uto])
  let says = []
  for (let [id, msg, ufrom, uto, comments, time] of q) {
    says.push({id, msg, ufrom, uto, comments:JSON.parse(comments), time})
  }
  return says
}

export function followAdd(follower, user) {
  db.query(`INSERT INTO follows (follower, user) 
                       VALUES (?,    ?)`, 
                       [follower, user])
}

export async function followList(user) {
  let q = db.query(`SELECT user FROM follows WHERE follower=?`, [user])
  let follows = []
  for (let [follow] of q) {
    follows.push(follow)
  }
  return follows
}

export async function followerList(user) {
  let q = db.query(`SELECT follower FROM follows WHERE user=?`, [user])
  let followers = []
  for (let [follower] of q) {
    followers.push(follower)
  }
  return followers
}