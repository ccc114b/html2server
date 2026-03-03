const http = require('http');

http.get('http://localhost:3000/', (response) => {

  let data = ''

  response.on('data', (chunk) => {
    data += chunk;
  })

  response.on('end', () => {
    console.log('statusCode:', response.statusCode)
    console.log('headers:', response.headers)
    console.log('data:', data)
  })

}).on("error", (err) => {
  console.log("Error: " + err.message)
})