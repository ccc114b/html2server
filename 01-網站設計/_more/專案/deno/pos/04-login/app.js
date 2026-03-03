import { Application, Router, send } from "https://deno.land/x/oak/mod.ts";
import { Session } from "https://deno.land/x/oak_sessions/mod.ts";
import { pos } from './pos.js'
import { posDb } from './posDb.js'
import { user } from './user.js'

const router = new Router()

router.get('/', (ctx)=>ctx.response.redirect('/public/'))
.get('/public/(.*)', pub)
.get('/order/list', pos.orderList)
.get('/user/list', user.list)
.post('/user/login', user.login)
.post('/user/logout', user.logout)
.post('/user/signup', user.signup)
.post('/order/upload', pos.orderUpload)

posDb.open()
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
