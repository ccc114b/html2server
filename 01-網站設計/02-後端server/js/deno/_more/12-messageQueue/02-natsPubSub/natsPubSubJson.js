import * as nats from "https://deno.land/x/nats/src/mod.ts";

const nc = await nats.connect({ servers: "demo.nats.io:4222" });

const sc = nats.JSONCodec();

const sub = nc.subscribe("people");
(async () => {
  for await (const m of sub) {
    const p = sc.decode(m.data);
    console.log(`[${sub.getProcessed()}]: ${JSON.stringify(p)}`);
  }
})();

const p = { name: "Memo" };
nc.publish("people", sc.encode(p));

await nc.drain();
