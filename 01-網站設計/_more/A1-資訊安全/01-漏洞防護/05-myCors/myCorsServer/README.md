
## run

Server

```
$ cd myCorsServer
$ deno run -A myCorsServer.js
```

Client

```
$ curl http://127.0.0.1:8
001/book/ -X options --in
clude
HTTP/1.1 200 OK
access-control-allow-headers: Content-Type, Authorization
access-control-allow-method: GET, POST
access-control-allow-origin: *
connection: keep-alive
x-response-time: 0ms
vary: Accept-Encoding
content-length: 0
date: Fri, 24 Nov 2023 08:07:37 GMT
```

Browser

![](./img/myCors.png)
