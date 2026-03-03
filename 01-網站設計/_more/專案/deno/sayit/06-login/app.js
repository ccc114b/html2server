import * as db from './db.js'
import {Server, sendJson, formParams, sendStatus, Status} from './server.js'

db.open()

const server = new Server()
server.public("/public")

server.router.get('/', home)
.get('/user/list', userList)
.post('/user/login', userLogin)
.post('/user/signup', userSignup)
.get('/user/:user/say', userSay)
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
  const user = formParams(ctx)
}

async function userLogin(ctx) {
  const params = formParams(ctx)
  let user = db.userGet(params.user)
  if (user != null && user.pass == params.password)
    sendStatus(ctx, Status.OK)
  else
    sendStatus(ctx, Status.Fail)
}

async function userSay(ctx) {
    let says = await db.sayBy(ctx.params['user'])
    sendJson(ctx, says)
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
