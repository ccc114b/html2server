const V = require('./view')
const M = require('./model')
const logger = require('koa-logger')
const router = require('koa-router')()
const koaBody = require('koa-body')
const session = require('koa-session')

const Koa = require('koa')
const app = module.exports = new Koa()

app.keys = ['adfklj293784jnasdlnf']

const CONFIG = {
  key: 'aakdjsfoijjsadfd',
  maxAge: 86400000
}

app.use(session(CONFIG, app))
app.use(logger())
app.use(koaBody())

router.get('/', list)
  .get('/user/:name', userPosts)
  .get('/post/new', add)
  .get('/post/:id', show)
  .post('/post', create)
  .get('/signup', signupPage)
  .get('/login', loginPage)
  .get('/logout', logout)
  .post('/signup', signup)
  .post('/login', login)

app.use(router.routes())

async function list (ctx) {
  const posts = await M.list({})
  ctx.body = await V.list(ctx, posts)
}

async function userPosts (ctx) {
  const username = ctx.params.name
  const posts = await M.list({ 'user.name': username })
  ctx.body = await V.list(ctx, posts)
}

async function add (ctx) {
  ctx.body = await V.new(ctx)
}

async function show (ctx) {
  const id = ctx.params.id
  const post = await M.get(id)
  if (!post) ctx.throw(404, 'invalid post id')
  ctx.body = await V.show(ctx, post)
}

async function create (ctx) {
  const post = ctx.request.body
  const user = ctx.session.user
  post.user = { name: user.name }
  await M.add(post)
  ctx.redirect('/user/' + user.name)
}

async function signupPage (ctx) {
  ctx.body = await V.signup(ctx)
}

async function loginPage (ctx) {
  ctx.body = await V.login(ctx)
}

async function signup (ctx) {
  const user = ctx.request.body
  const r = await M.signup(user)
  if (r) {
    ctx.session.user = { name: user.name }
    ctx.redirect('/user/' + user.name)
  } else {
    ctx.session.msg = `Signup Fail: username ${user.name} already taken by someone else !`
    ctx.body = V.signup(ctx)
  }
}

async function login (ctx) {
  const user = ctx.request.body
  const r = await M.login(user)
  if (r) {
    ctx.session.user = { name: user.name }
    ctx.redirect('/user/' + user.name)
  } else {
    ctx.session.msg = 'Login Fail: username or password incorrect !'
    ctx.body = V.login(ctx)
  }
}

async function logout (ctx) {
  delete ctx.session.user
  ctx.redirect('/')
}

async function main () {
  await M.open()
  app.listen(3000)
  console.log('Server run at http://localhost:3000')
}

if (!module.parent) {
  main().catch(error => console.log('error:', error))
}
