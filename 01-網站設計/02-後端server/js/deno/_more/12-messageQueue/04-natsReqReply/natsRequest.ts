import * as nats from "https://deno.land/x/nats/src/mod.ts";

const nc = await nats.connect({ servers: "demo.nats.io:4222" });
const sc = nats.StringCodec();

await nc.request("time", nats.Empty, { timeout: 1000 })
  .then((m) => {
    console.log(`got response: ${sc.decode(m.data)}`);
  })
  .catch((err) => {
    console.log(`problem with request: ${err.message}`);
  });

await nc.request("admin.uptime", nats.Empty, { timeout: 1000 })
  .then((m) => {
    console.log(`admin.uptime: ${sc.decode(m.data)}`);
  })
  .catch((err) => {
    console.log(`admin.uptime:error=${err.message}`);
  });

await nc.close();
