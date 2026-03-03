import { Application, Router } from "https://deno.land/x/oak/mod.ts";
import { oakCors } from "https://deno.land/x/cors/mod.ts";

const books = new Map();
books.set("1", {
  id: "1",
  title: "Frankenstein",
  author: "Mary Shelley",
});

const router = new Router();
router.get("/book", (context) => {
  context.response.body = Array.from(books.values());
})
.get("/book/:id", (context) => {
    if (context.params && context.params.id && books.has(context.params.id)) {
      context.response.body = books.get(context.params.id);
    }
});


const app = new Application();
app.use(
  oakCors({
    origin: /^.+localhost:(1234|8002)$/,
    optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
  }),
);
app.use(router.routes());

console.info("CORS-enabled web server listening on port 8001");
await app.listen({ port: 8001 });