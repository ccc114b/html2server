import { connect } from "https://deno.land/x/redis/mod.ts";

const redis = await connect({ hostname: "127.0.0.1" });
const sub = await redis.subscribe("ccckmit");

(async function () {
  for await (const { channel, message } of sub.receive()) {
    // on message
    console.log(`channel=${channel} message=${message}`)
  }
})();

console.log('subscribe ccckmit ...')
