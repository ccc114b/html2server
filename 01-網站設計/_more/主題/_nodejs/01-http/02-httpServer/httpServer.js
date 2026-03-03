const http = require('http');

const port = 3000, hostname = 'localhost'

const server = http.createServer((request, response) => {
  console.log('url:', request.url);
  console.log('  method:', request.method);
  console.log('  headers', request.headers);
  response.statusCode = 200;
  response.setHeader('Content-Type', 'text/plain');
  response.write('Hello World\n');
  response.end()
});

server.listen(port, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});