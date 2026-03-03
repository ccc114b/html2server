import { Application, Router, send } from "https://deno.land/x/oak/mod.ts";
import { Session } from "https://deno.land/x/oak_sessions/mod.ts";
import { Db } from './db.js'
import { Shop } from './shop.js'
import { User } from './user.js'

const router = new Router()

router.get('/', (ctx)=>ctx.response.redirect('/public/'))
.get('/public/(.*)', pub)
.get('/users/list', User.list)
.get('/user/:user', User.get)
.post('/user/login', User.login)
.post('/user/logout', User.logout)
.post('/user/signup', User.signup)
.get('/user/order/list', User.orderList)
.get('/shops/list', Shop.list)
.get('/shop/:shop', Shop.get)
.post('/shop/save', Shop.save)
.post('/shop/order/upload', Shop.orderUpload)
.get('/shop/order/list', Shop.orderList)
.get('(.*)', (ctx)=>{ ctx.response.status = 404; console.log(`error: path='${ctx.request.url.pathname}' unhandled!`)})

await Db.open()
const app = new Application()
app.use(Session.initMiddleware())
app.use(router.routes())
app.use(router.allowedMethods())

async function pub(ctx) {
    console.log('pathname=', ctx.request.url.pathname)
    await send(ctx, ctx.request.url.pathname, {
        root: `${Deno.cwd()}/`,
        index: "index.html",
      })
}

console.log('Server run at http://127.0.0.1:8000')
await app.listen({ port: 8000 })
