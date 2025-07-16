import * as nats from "https://deno.land/x/nats/src/mod.ts"
import {input} from "./input.ts"

if (Deno.args.length != 1) {
  console.log('deno run -A chatRoom.js <user>\n需要您的姓名作為第一個參數！')
  Deno.exit(1)
}

const nc = await nats.connect({ servers: "demo.nats.io:4222" })
const sc = nats.JSONCodec()

let user = Deno.args[0]
console.log(`歡迎 ${user} 進來，可以開始輸入下列指令了 ...\n\nsend <group> <msg>\nsub <group>\n\n`)

while (true) {
  let cmd = await input()
  let tokens = cmd.split(" ")
  let op = tokens[0], group = tokens[1], msg = tokens.slice(2).join(' ')
  // console.log('op=', op, 'group=', group, 'msg=', msg)
  switch (op) {
    case 'sub': 
      const sub = nc.subscribe(group);
      (async () => {
      for await (const m of sub) {
          const json = sc.decode(m.data);
          console.log(`${json.user}=>${group}: ${json.msg}`);
      }
      })();
      break;
    case 'send':
      const json = { user, msg };
      nc.publish(group, sc.encode(json));
      break;
    default: console.log(`命令無法處理...`)
  }
}

await nc.drain();
