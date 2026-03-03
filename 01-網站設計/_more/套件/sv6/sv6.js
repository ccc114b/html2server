import { Application, send } from "https://deno.land/x/oak/mod.ts";
import * as path from "https://deno.land/std/path/mod.ts"
import { dirList } from "../de6/de6.js"

const app = new Application()

var root = Deno.args[0] || Deno.cwd()
if (root.startsWith('.')) root = path.join(Deno.cwd(), root)

app.use(async (ctx) => {
  let relPath = ctx.request.url.pathname
  console.log('relPath=', relPath)
  let absPath = path.join(root, relPath)
  console.log('absPath=', absPath)
  try {
    if (relPath.endsWith('/.meta.json')) {
      let tPath = absPath.substr(0, absPath.length - '.meta.json'.length)
      console.log('tPath=', tPath)
      let list = await dirList(tPath)
      ctx.response.type = "json"
      ctx.response.body = JSON.stringify(list, null, 2)
    } else {
      await send(ctx, relPath, {
        root: root,
        index: "index.html",
      })
    }
  } catch (error) {
    ctx.response.status = 400
    ctx.response.body = error
  }
})

console.log('start at : http://127.0.0.1:8000')
console.log('root=', root)
await app.listen({ port: 8000 })
