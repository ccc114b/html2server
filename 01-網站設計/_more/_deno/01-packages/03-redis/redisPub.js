import { connect } from "https://deno.land/x/redis/mod.ts";

const redis = await connect({ hostname: "127.0.0.1" });

await redis.publish('ccckmit', 'hello');
await redis.publish('ccckmit', 'world');
