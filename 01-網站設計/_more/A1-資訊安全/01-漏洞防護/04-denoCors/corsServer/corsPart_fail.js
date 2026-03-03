import { Application, Router } from "https://deno.land/x/oak/mod.ts";
import { oakCors } from "https://deno.land/x/cors/mod.ts";

const books = new Map()
books.set("1", {
  id: "1",
  title: "Frankenstein",
  author: "Mary Shelley",
});

books.set("2", {
    id: "2",
    title: "道德經",
    author: "李耳",
  });
  
const router = new Router();
router
  .get("/book", (context) => {
    context.response.body = Array.from(books.values());
  })
  // Enable CORS for a Single Route
  .get("/book/:id", oakCors(), (context) => {
    if (context.params.id && books.has(context.params.id)) {
      context.response.body = books.get(context.params.id);
    }
  });

const app = new Application();
app.use(router.routes());

console.info("CORS-enabled web server listening on port 8001");
await app.listen({ port: 8001 });