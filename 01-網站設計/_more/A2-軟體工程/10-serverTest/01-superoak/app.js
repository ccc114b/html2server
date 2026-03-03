import { Application, Router } from "https://deno.land/x/oak@v10.4.0/mod.ts";

const router = new Router();
router.get("/", (ctx) => {
  ctx.response.body = "Hello Deno!";
});
router.post("/user", (ctx) => {
  ctx.response.body = "Post!";
});

export const app = new Application();
app.use(router.routes());
app.use(router.allowedMethods());
