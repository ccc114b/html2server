import { Application, Router, send } from "https://deno.land/x/oak/mod.ts";
import { oakCors } from "https://deno.land/x/cors/mod.ts";

const books = new Map();
books.set("1", {
  id: "1",
  title: "Frankenstein",
  author: "Mary Shelley",
});

const router = new Router();
router
  .get("/", async (context) => {
    await send(context, context.request.url.pathname, {
      root: `${Deno.cwd()}/static`,
      index: "index.html",
    });
  })
  .get("/book", (context) => {
    context.response.body = Array.from(books.values());
  })
  .get("/book/:id", (context) => {
    if (context.params && context.params.id && books.has(context.params.id)) {
      context.response.body = books.get(context.params.id);
    }
  });

const app = new Application();

// Timing
app.use(async (ctx, next) => {
  const start = Date.now();
  await next();
  const ms = Date.now() - start;
  ctx.response.headers.set("X-Response-Time", `${ms}ms`);
  // ctx.response.headers.set("X-Permitted-Cross-Domain-Policies", "none")
  ctx.response.headers.set("Access-Control-Allow-Origin", "*")
  ctx.response.headers.set("Access-Control-Allow-Method", "GET, POST")
  ctx.response.headers.set("Access-Control-Allow-Headers", "Content-Type, Authorization")
  ctx.response.headers.set("Connection", "keep-alive")
  console.log('ctx.response.body=', ctx.response.body)
  if (ctx.response.body == null) {
    ctx.response.body == 'success!'
    ctx.response.status = 200
  }
  // ctx.response.headers.set("Access-Control-Allow-Origin", "http://localhost:8002/")
})

// app.use(oakCors()); // Enable CORS for All Routes
app.use(router.routes());

console.info("CORS-enabled web server listening on port 8001");
await app.listen({ port: 8001 });