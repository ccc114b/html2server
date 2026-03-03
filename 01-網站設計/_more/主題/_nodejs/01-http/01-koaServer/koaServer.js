const Koa = require('koa');
const app = module.exports = new Koa();

app.use(async function(ctx) {
  console.log('url:', ctx.url)
  console.log('  method:', ctx.method)
  console.log('  headers:', ctx.headers)
  ctx.type = 'text/html'
  ctx.body = 'Hello World 你好！<a href="http://tw.youtube.com">YouTube</a>';
});

app.listen(3000)
console.log(`Server running at http://localhost:3000/`)
