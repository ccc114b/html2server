// import * as nats from "https://deno.land/x/nats/src/mod.ts";
import * as nats from "https://raw.githubusercontent.com/nats-io/nats.ws/main/src/mod.ts";

// const nc = await nats.connect({ servers: "demo.nats.io:4222" });
const nc = await nats.connect({ servers: "ws:localhost:4222" });

const sc = nats.StringCodec();
const sub = nc.subscribe("hello");
(async () => {
  for await (const m of sub) {
    console.log(`[${sub.getProcessed()}]: ${sc.decode(m.data)}`);
  }
  console.log("subscription closed");
})();

nc.publish("hello", sc.encode("world"));
nc.publish("hello", sc.encode("again"));

await nc.drain();


