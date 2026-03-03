import * as nats from "https://deno.land/x/nats/src/mod.ts";

const servers = [
    {},
    { servers: ["demo.nats.io:4442", "demo.nats.io:4222"] },
    { servers: "demo.nats.io:4443" },
    { port: 4222 },
    { servers: "localhost" },
  ];
  await servers.forEach(async (v) => {
    try {
      const nc = await nats.connect(v);
      console.log(`connected to ${nc.getServer()}`);
      const done = nc.closed();
      await nc.close();
      const err = await done;
      if (err) {
        console.log(`error closing:`, err);
      }
    } catch (err) {
      console.log(`error connecting to ${JSON.stringify(v)}`);
    }
  });