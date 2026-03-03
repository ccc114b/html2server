import * as nats from "https://deno.land/x/nats/src/mod.ts";
import {input} from "./input.ts"

console.log("可以開始輸入指令了 ...")
while (true) {
    let cmd = await input()
    let [head, msg] = cmd.split(":")
    let [op, group] = head.split(" ")
    console.log('op=', op, 'group=', group, 'msg=', msg)
    switch (op) {
        case 'sub': break;
        case 'send': break;
        default: console.log(`命令無法處理...`)
    }
}
