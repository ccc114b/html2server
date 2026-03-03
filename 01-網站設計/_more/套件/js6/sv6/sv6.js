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
  let absPath = path.join(root, fpath)
  const fInfo = await Deno.lstat(absPath)
  // console.log('fInfo=', fInfo)
  if (fInfo.isDirectory) {
    let list = await dirList(absPath)
    // console.log('list=', list)
    ctx.response.type = "json"
    ctx.response.body = JSON.stringify(list, null, 2)
  } else if (fInfo.isFile) {
    await send(ctx, fpath, {
      root: root,
      // index: "index.html",
    })
  } else {
    ctx.response.status = 404
    ctx.response.body = "File not found!"
  }
})

console.log('start at : http://127.0.0.1:8000')
console.log('root=', root)
await app.listen({ port: 8000 })
