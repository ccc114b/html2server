import * as db from './db.js'

let users = [
    ["admin","ccc313534", "admin@gmail.com"],
    ["ccc", "ccc313534", "ccc@gmail.com"],
]

let response1 = {
    answer: "預設的回答 ...."
}

let chats = [
    ["0", "admin", {question:"DenoGPT 讚！"}, response1],
    ["1", "ccc", {question:"GPT 是甚麼?"}, response1],
    ["2", "ccc", {question:"請寫一本 ChatGPT 的書, 先寫目錄"}, response1],
]

try {
    await Deno.remove('denogpt.db')
    console.log('remove denogpt.db')
} catch (e) {
}

await db.open()
await db.clear()

for (let [user, pass, email] of users) {
    await db.userAdd({user, pass, email})
}
console.log('users=', await db.userList())

for (let [cid, user, query, response] of chats) {
    await db.chatAdd({cid, user, query, response})
}
console.log('chatList(ccc)=', await db.chatList('ccc'))

await db.close()
