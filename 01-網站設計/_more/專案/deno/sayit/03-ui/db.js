import { DB } from "https://deno.land/x/sqlite/mod.ts";

let db = null

export async function open() {
  db = new DB("say.db");
  db.query(`CREATE TABLE IF NOT EXISTS says 
              (id INTEGER PRIMARY KEY AUTOINCREMENT, 
               msg TEXT, ufrom TEXT, uto TEXT, 
               comments TEXT)`)
}

export async function sayAdd(say) {
  db.query(`INSERT INTO says (msg, ufrom, uto, comments) 
                      VALUES (?,   ?,    ?,  ?)`, 
                      [say.msg, say.ufrom, say.uto, say.comments])
}

export async function sayBy(uto) {
  let q = db.query(`SELECT id, msg, ufrom, uto, comments 
            FROM says WHERE uto=?`, [uto])
  let says = []
  for (let [id, msg, ufrom, uto, comments] of q) {
    says.push({id, msg, ufrom, uto, comments:JSON.parse(comments)})
  }
  return says
}

export async function close() {
  db.close()
}
