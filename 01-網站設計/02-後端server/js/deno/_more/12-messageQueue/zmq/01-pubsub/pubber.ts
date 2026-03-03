// pubber.ts
import { DenoHttpServer, Pub } from "https://deno.land/x/zmq/mod.ts";
const server = new DenoHttpServer("ws://localhost:80");
const sock = new Pub();

sock.bind(server);
console.log("Publisher bound.");

setInterval(function () {
  console.log("sending a multipart message envelope");
  sock.send(["kitty cats", "meow!"]);
}, 500);