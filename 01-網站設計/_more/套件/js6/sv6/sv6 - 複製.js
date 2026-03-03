import { Application, send } from "https://deno.land/x/oak/mod.ts";
import * as path from "https://deno.land/std/path/mod.ts"
import { dirList } from "../fs6/fs6.js"

const app = new Application()

// console.log(Deno.args)
var root = Deno.args[0] || Deno.cwd()
if (root.startsWith('.')) root = path.join(Deno.cwd(), root)

app.use(async (ctx) => {
  let fpath = ctx.request.url.pathname
  console.log('fpath=', fpath)
  const fileInfo = await Deno.lstat(fpath)
  if (fpath.endsWith('/')) {
    let list = await dirList()
    // console.log('list=', list)
    ctx.response.type = "json"
    ctx.response.body = JSON.stringify(list, null, 2)
  } else {
    await send(ctx, fpath, {
      root: root,
      index: "index.html",
    })
  }
})

console.log('start at : http://127.0.0.1:8000')
console.log('root=', root)
await app.listen({ port: 8000 })
