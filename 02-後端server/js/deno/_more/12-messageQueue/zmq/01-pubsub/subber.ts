// subber.ts
import { Sub } from "https://deno.land/x/zmq/mod.ts";

const sock = new Sub();
sock.connect("ws://localhost:80");
sock.subscribe("kitty cats");
console.log("Subscriber connected to port 3000");

sock.on("message", function (endpoint, topic, message) {
  console.log(
    "received a message related to:",
    topic.toString(),
    "containing message:",
    message.toString(),
  );
});