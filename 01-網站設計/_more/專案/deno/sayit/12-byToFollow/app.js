import * as db from './db.js'
import {Server, sendJson, bodyParams, sendStatus, Status} from './server.js'

db.open()

const server = new Server()
server.public("/public")

server.router.get('/', home)
.get('/userList', userList)
.post('/login', login)
.post('/signup', signup)
.get('/msgBy/:user', msgBy)
.get('/msgTo/:user', msgTo)
.get('/msgFollow/:user', msgFollow)
.get('/followTo/:user', followTo)
.get('/followBy/:user', followBy)

async function home(ctx) {
    ctx.response.redirect("/public/")
}

async function userList(ctx) {
    let users = await db.userList()
    sendJson(ctx, users)
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
  let user = await db.userGet(params.user)
  if (user != null && user.pass == params.password)
    sendStatus(ctx, Status.OK)
  else
    sendStatus(ctx, Status.Fail)
}

async function msgBy(ctx) {
    let msgs = await db.msgBy(ctx.params['user'])
    sendJson(ctx, msgs)
}

async function msgTo(ctx) {
  let msgs = await db.msgTo(ctx.params['user'])
  sendJson(ctx, msgs)
}

async function msgFollow(ctx) {
  let msgs = await db.msgFollow(ctx.params['user'])
  sendJson(ctx, msgs)
}

async function followTo(ctx) {
    let follows = await db.followList(ctx.params['user'])
    sendJson(ctx, follows)
}

async function followBy(ctx) {
    let followers = await db.followerList(ctx.params['user'])
    sendJson(ctx, followers)
}

await server.listen(8000)
