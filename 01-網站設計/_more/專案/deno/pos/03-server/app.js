import { Application, Router, send } from "https://deno.land/x/oak/mod.ts";
import { pos } from './pos.js'

const app = new Application()
const router = new Router()

router.get('/', (ctx)=>ctx.response.redirect('/public/'))
.get('/public/(.*)', pub)
.post('/order/upload', pos.orderUpload)
.get('/order/list', pos.orderList)

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
