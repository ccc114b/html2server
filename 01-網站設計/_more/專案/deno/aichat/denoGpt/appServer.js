import * as db from './db.js'
import {Server, sendJson, bodyParams, sendStatus, Status} from './server.js'
import * as ai from './ai.js'

export const server = new Server()

server.router.get('/', home)
.post('/login', login)
.post('/signup', signup)
.post('/chat', chat)
.get('/chatGet/:cid', chatGet)
.get('/chatList', chatList)

async function home(ctx) {
    ctx.response.redirect("/public/#home")
}

async function signup(ctx) {
  const params = await bodyParams(ctx)
  console.log('params=', params)
  let user = await db.userGet(params.user)
  if (user == null) { // user name available
    console.log('signup:params=', params)
    await db.userAdd({user:params.user, pass:params.password, email:params.email})
    sendStatus(ctx, Status.OK)
  }
  else
    sendStatus(ctx, Status.Fail)
}

async function login(ctx) {
  const params = await bodyParams(ctx)
  let userObj = await db.userGet(params.user)
  console.log('login:userObj=', userObj)
  if (userObj != null && userObj.pass == params.password) {
    await ctx.state.session.set('userObj', userObj)
    sendStatus(ctx, Status.OK)
  } else
    sendStatus(ctx, Status.Fail)
}

async function loginUser(ctx) {
  let userObj = await ctx.state.session.get('userObj')
  if (userObj == null) return null
  return userObj.user
}

async function chat(ctx) {
  let user = await loginUser(ctx)
  if (user == null) return
  const param = await bodyParams(ctx)
  console.log("param=", param)
  let {cid, query} = param
  let response = await ai.chat(query.question)
  console.log('ai.chat:response=', response)
  await db.chatAdd({cid, user, query, response})
  sendJson(ctx, response)
  return
}

async function chatGet(ctx) {
  let user = await loginUser(ctx)
  if (user == null) return
  const cid = await ctx.params["cid"]
  let r = await db.chatGet(cid)
  if (r.user !== user) return
  console.log('chatGet:r=', r)
  sendJson(ctx, r)
}

async function chatList(ctx) {
  console.log('chatList()...')
  let user = await loginUser(ctx)
  console.log('user=', user)
  if (user == null) return
  let r = await db.chatList(user)
  console.log('chatList:r=', r)
  sendJson(ctx, r)
}

await db.open()
server.public("/public")
server.useRouter()
