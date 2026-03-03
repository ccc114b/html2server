import * as db from './db.js'
import {Server, sendJson, bodyParams, sendStatus, Status} from './server.js'

db.open()

const server = new Server()
server.public("/public")

server.router.get('/', home)
.get('/user/list', userList)
.post('/user/login', userLogin)
.post('/user/signup', userSignup)
.get('/user/:user/msg', userMsg)
.get('/user/:user/msgFollow', userFollowMsg)
.get('/user/:user/follow', userFollow)
.get('/user/:user/follower', userFollower)

async function home(ctx) {
    ctx.response.redirect("/public/")
}

async function userList(ctx) {
    let users = await db.userList()
    sendJson(ctx, users)
}

async function userSignup(ctx) {
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

async function userLogin(ctx) {
  const params = await bodyParams(ctx)
  let user = await db.userGet(params.user)
  if (user != null && user.pass == params.password)
    sendStatus(ctx, Status.OK)
  else
    sendStatus(ctx, Status.Fail)
}

async function userMsg(ctx) {
    let msgs = await db.msgBy(ctx.params['user'])
    sendJson(ctx, msgs)
}

async function userFollowMsg(ctx) {
  let msgs = await db.msgFollow(ctx.params['user'])
  sendJson(ctx, msgs)
}

async function userFollow(ctx) {
    let follows = await db.followList(ctx.params['user'])
    sendJson(ctx, follows)
}

async function userFollower(ctx) {
    let followers = await db.followerList(ctx.params['user'])
    sendJson(ctx, followers)
}

await server.listen(8000)
