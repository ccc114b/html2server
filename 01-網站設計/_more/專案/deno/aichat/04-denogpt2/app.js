import * as db from './db.js'
import {Server, sendJson, bodyParams} from './server.js'
import * as ai from './ai.js'
db.open()

const server = new Server()
server.public("/public")

server.router.get('/', home)
.post('/chat', chat)
.get('/chatGet/:id', chatGet)
.get('/chatList/:user', chatList)

async function home(ctx) {
    ctx.response.redirect("/public/#home")
}

async function chat(ctx) {
  const param = await bodyParams(ctx)
  console.log("param=", param)
  let {cid, user, query} = param
  let response = await ai.chat(query.question)
  console.log('ai.chat:response=', response)
  await db.chatAdd({cid, user, query, response})
  sendJson(ctx, response)
}

async function chatGet(ctx) {
  const id = await ctx.params["id"]
  let r = await db.chatGet(id)
  console.log('chatGet:r=', r)
  sendJson(ctx, r)
}

async function chatList(ctx) {
  const user = await ctx.params["user"]
  console.log('chatList:user=', user)
  let r = await db.chatList(user)
  console.log('chatList:r=', r)
  sendJson(ctx, r)
}

await server.listen(8002)

