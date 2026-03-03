import { Application, Router, send } from "https://deno.land/x/oak/mod.ts";
import * as lib from './lib.js'

const app = new Application()
const router = new Router()

router.get('/', home)
  .get('/public/(.*)', pub)
  .get('/chat/:question', chat)

app.use(router.routes())
app.use(router.allowedMethods())

async function home(ctx) {
  ctx.response.redirect('/public/index.html')
}

async function pub(ctx) {
  console.log('path=', ctx.request.url.pathname)
  await send(ctx, ctx.request.url.pathname, {
    root: `${Deno.cwd()}/`,
    index: "index.html",
  })
}

async function chat (ctx) {
    const q = ctx.params.question
    let r = await lib.chat(q)
    console.log('r=', r)
    ctx.response.type = 'application/json'
    ctx.response.body = r
}

console.log('Server run at http://127.0.0.1:8001')
await app.listen({ port: 8001 })