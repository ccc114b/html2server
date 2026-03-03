import { connect } from "https://deno.land/x/redis/mod.ts";
const redis = await connect({
  hostname: "127.0.0.1",
  port: 6379,
});
const ok = await redis.set("hoge", "fuga");
const fuga = await redis.get("hoge");
console.log('get(hoge)=', fuga)

