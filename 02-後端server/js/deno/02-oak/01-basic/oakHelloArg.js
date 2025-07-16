import { Application } from "https://deno.land/x/oak/mod.ts";

const app = new Application();

app.use((ctx) => {
  ctx.response.body = "Hello World!";
});

let port = parseInt(Deno.args[0])
console.log('start at : http://127.0.0.1:'+port)
await app.listen({ port: port });
