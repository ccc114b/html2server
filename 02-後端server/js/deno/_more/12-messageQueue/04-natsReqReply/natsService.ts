import * as nats from "https://deno.land/x/nats/src/mod.ts";

const nc = await nats.connect({ servers: "demo.nats.io" });
const sc = nats.StringCodec();

// 對於 time 這類的請求之回應處理方式。
const sub = nc.subscribe("time"); 
(async (sub: Subscription) => {
  console.log(`listening for ${sub.getSubject()} requests...`);
  for await (const m of sub) {
    if (m.respond(sc.encode(new Date().toISOString()))) {
      console.info(`[time] handled #${sub.getProcessed()}`);
    } else {
      console.log(`[time] #${sub.getProcessed()} ignored - no reply subject`);
    }
  }
  console.log(`subscription ${sub.getSubject()} drained.`);
})(sub);

// 對於 admin.* 這類的請求之回應處理方式。
const started = Date.now();
const msub = nc.subscribe("admin.*");
(async (sub: Subscription) => {
  console.log(`listening for ${sub.getSubject()} requests [uptime | stop]`);
  for await (const m of sub) {
    const chunks = m.subject.split(".");
    console.info(`[admin] #${sub.getProcessed()} handling ${chunks[1]}`);
    switch (chunks[1]) { // 對 admin.uptime 的回應
      case "uptime":
        m.respond(sc.encode(`${Date.now() - started}`));
        break;
      case "stop": {// 對 admin.stop 的回應
        m.respond(sc.encode(`[admin] #${sub.getProcessed()} stopping....`));
        nc.drain()
          .catch((err) => {
            console.log("error draining", err);
          });
        break;
      }
      default:
        console.log(
          `[admin] #${sub.getProcessed()} ignoring request for ${m.subject}`,
        );
    }
  }
  console.log(`subscription ${sub.getSubject()} drained.`);
})(msub);

// 關閉連線時的處理 ...
await nc.closed().then((err?: void | Error) => {
  let m = `connection to ${nc.getServer()} closed`;
  if (err) {
    m = `${m} with an error: ${err.message}`;
  }
  console.log(m);
});
