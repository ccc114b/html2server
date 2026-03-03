import { Application, Router, send } from "https://deno.land/x/oak/mod.ts";

export class Server {
    constructor() {
        this.app = new Application()
        this.router = new Router()
    }
    public(path) {
        this.router.get(`${path}/(.*)`, async (ctx)=>{
          console.log(ctx.request.url.pathname)
          await send(ctx, ctx.request.url.pathname, {
              root: `${Deno.cwd()}/`,
              index: "index.html",
          })
        })
    }
    async listen(port) {
        this.app.use(this.router.routes())
        this.app.use(this.router.allowedMethods())
        console.log('Server run at http://127.0.0.1:8000')
        await this.app.listen({ port })
    }
}

export function sendJson(ctx, obj) {
  ctx.response.type = 'application/json'
  ctx.response.body = obj
}

export const Status = {
  OK:200,
  Fail:400,
  Unauthorized:401,
  Forbidden:403,
  NotFound:404,
}

export function sendStatus(ctx, status) {
  ctx.response.type = 'application/json'
  ctx.response.status = status
  ctx.response.body = {status}
}

export async function formParams(ctx) {
  let body = ctx.request.body()
  if (body.type === "form") {
    return await formParse(body)
  }
}

export async function formParse(body) {
  const pairs = await body.value
  const obj = {}
  for (const [key, value] of pairs) {
    obj[key] = value
  }
  return obj
}


