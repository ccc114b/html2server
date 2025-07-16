// main.ts
import { Application, Router, send } from "https://deno.land/x/oak/mod.ts";

const app = new Application();
const router = new Router();

const users = new Map<string, string>();

// Serve static files (like the HTML file)
app.use(async (context) => {
  await send(context, context.request.url.pathname, {
    root: `${Deno.cwd()}/static`, // Replace 'static' with the directory where your HTML file is located.
    index: "index.html",
  });
});

router
  .post("/register", async (context) => {
    const { value } = await context.request.body();
    console.log('value=', value)
    const { username, password } = value;
    if (!username || !password) {
      context.response.status = 400;
      context.response.body = { error: "Invalid username or password" };
      return;
    }

    if (users.has(username)) {
      context.response.status = 400;
      context.response.body = { error: "Username already exists" };
      return;
    }

    users.set(username, password);
    context.response.body = { message: "Registration successful" };
  })
  .post("/login", async (context) => {
    const { value } = await context.request.body();
    const { username, password } = value;

    if (!username || !password) {
      context.response.status = 400;
      context.response.body = { error: "Invalid username or password" };
      return;
    }

    if (!users.has(username) || users.get(username) !== password) {
      context.response.status = 401;
      context.response.body = { error: "Invalid credentials" };
      return;
    }

    context.response.body = { message: "Login successful" };
  });

app.use(router.routes());
app.use(router.allowedMethods());

console.log("Server is running on http://localhost:8000");
await app.listen({ port: 8000 });
