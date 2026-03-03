import * as db from './db.js'

let users = [
    ["guest","denogpt123", "", 10000],
    ["ccc", "ccc313534", "ccc@gmail.com", 100],
]

let response1 = {
    answer: `
# 問題：???

## ChatGPT 回答

GPT是Generative Pre-trained Transformer的縮寫，是一種基於Transformer架構的自然語言生成模型。GPT系列模型由OpenAI研發，以大規模無監督學習的方式預先訓練，然後可以用於許多自然語言處理任務，例如語言生成、語言理解、文本分類、機器翻譯等。

GPT-3是目前最大型的GPT模型，使用了1750億個參數，可以生成非常自然流暢的語言，甚至可以進行翻譯、文章寫作、對話生成等多種任務。GPT模型的強大之處在於其能夠自動提取大量的文本資訊，從而能夠生成具有高度相關性和語法正確的語言，並在許多自然語言處理任務上取得非常出色的表現。
`
}

let chats = [
    ["0", "ccc", {question:"DenoGPT 讚！"}, response1],
    ["1", "guest", {question:"GPT 是甚麼?"}, response1],
    ["2", "guest", {tag:'寫書', question:"請寫一本 ChatGPT 的書, 先寫目錄"}, response1],
]

try {
    await Deno.remove('denogpt.db')
    console.log('remove denogpt.db')
} catch (e) {
}

await db.open()
await db.clear()

for (let [user, pass, email, quota] of users) {
    await db.userAdd({user, pass, email, quota})
}
console.log('users=', await db.userList())

for (let [cid, user, query, response] of chats) {
    await db.chatAdd({cid, user, query, response})
}
console.log('chatList(guest)=', await db.chatList('guest'))

await db.close()
