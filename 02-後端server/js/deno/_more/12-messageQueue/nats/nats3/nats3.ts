import { connect } from "https://deno.land/x/nats/src/mod.ts";

try {
  const nc = await connect({
    servers: ["nats://localhost:4222"],
  });
  
  nc.subscribe("foo", (msg) => {
    console.log("Received message:", msg);
  });
  
  nc.publish("foo", "Hello, world!");
  
} catch (err) {
  console.log('err=', err)
}
