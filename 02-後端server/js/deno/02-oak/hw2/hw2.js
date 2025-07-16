// 修改自 范揚玄 https://github.com/wrr606/ws112a/blob/master/homework/2/2.js

import { Application, Router } from "https://deno.land/x/oak/mod.ts";

const room = new Map();
room.set("e320", {
  "教室": "e320",
  "功能": "多媒體教室",
});
room.set("e319", {
  "教室": "e319",
  "功能": "嵌入式實驗室",
});

const router = new Router();
router
  .get("", (context) => {
    context.response.body = `
    <html>
        <body>
        </body>
    </html>`;
  })
  .get("/nqu", (context) => {
    context.response.body = `
    <html>
        <body>
            <a href="https://www.nqu.edu.tw/">NQU</a>
        </body>
    </html>`;
  })
  .get("/nqu/csie", (context) => {
    context.response.body = `
    <html>
        <body>
            <a href="https://csie.nqu.edu.tw/">NQU_CSIE</a>
        </body>
    </html>`;
  })
  .get("/room/:id", (context) => {
    console.log('id=', context.params.id)
    if (context.params && context.params.id && room.has(context.params.id)) {
        console.log('room=', room.get(context.params.id))
        context.response.body = room.get(context.params.id);
    }
  })
  .get("/to/nqu", (context) => {
    context.response.redirect('https://www.nqu.edu.tw/')
  })
  .get("/to/nqu/csie", (context) => {
    context.response.redirect('https://csie.nqu.edu.tw/')
  });

const app = new Application();
app.use(router.routes());
app.use(router.allowedMethods());

console.log("start at : http://127.0.0.1:8000");
await app.listen({ port: 8000 });