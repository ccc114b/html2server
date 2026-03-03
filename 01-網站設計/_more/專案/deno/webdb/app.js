import { Application, Router} from "https://deno.land/x/oak/mod.ts";
import { oakCors } from "https://deno.land/x/cors/mod.ts";
import { DB } from "https://deno.land/x/sqlite/mod.ts";

const db = new DB("web.db");
const app = new Application()
const router = new Router()

router.post('/sqlite', sqlite)

app.use(oakCors()); // Enable CORS for All Routes
app.use(router.routes())
app.use(router.allowedMethods())

async function sqlite(ctx) {
  const body = ctx.request.body(); // content type automatically detected
  console.log('body = ', body)
  if (body.type === "json") {
    let json = await body.value
    console.log('json=', json)
    let sql = json.sql
    console.log('sql=', sql)
    // let result = sql ? db.query(sql.replaceAll('"', "'")) : '[]'
    let result = sql ? db.query(sql) : '[]'
    ctx.response.body = result
  }
}

console.log('Server run at http://127.0.0.1:8009')
await app.listen({ port: 8009 })
