import { Application, Router, send } from "https://deno.land/x/oak/mod.ts";
import * as db from './db.js'

db.open()

const app = new Application()

const router = new Router()

router.get('/say/:user', sayBy)

app.use(router.routes())
app.use(router.allowedMethods())

function sendJson(ctx, obj) {
    ctx.response.type = 'application/json'
    ctx.response.body = obj
}

async function sayBy (ctx) {
    let says = await db.sayBy(ctx.params['user'])
    sendJson(ctx, says)
}

console.log('Server run at http://127.0.0.1:8000')
await app.listen({ port: 8000 })
