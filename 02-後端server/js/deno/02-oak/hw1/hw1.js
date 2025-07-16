// https://github.com/wrr606/ws112a/blob/master/homework/1/1.js
// 范揚玄 版本
// https://github.com/ccc112a/ws112a/issues/1

import { Application, send } from "https://deno.land/x/oak/mod.ts";

const app = new Application();

app.use(async (ctx) => {
  console.log(`path=${ctx.request.url.pathname}`)
  ctx.response.body = `
    <html>
        <body>
        </body>
    </html>`
  if(ctx.request.url.pathname==`/nqu`){
    ctx.response.body = `
    <html>
        <body>
            <a href="https://www.nqu.edu.tw/">NQU</a>
        </body>
    </html>`
  }
  else if(ctx.request.url.pathname==`/nqu/csie`){
    ctx.response.body = `
    <html>
        <body>
            <a href="https://csie.nqu.edu.tw/">NQU_CSIE</a>
        </body>
    </html>`
  }
  else if(ctx.request.url.pathname==`/to/nqu`){
    ctx.response.redirect('https://www.nqu.edu.tw/')
  }
  else if(ctx.request.url.pathname==`/to/nqu/csie`){
    ctx.response.redirect('https://csie.nqu.edu.tw/')
  }
});

console.log('start at : http://127.0.0.1:8000')
await app.listen({ port: 8000 });