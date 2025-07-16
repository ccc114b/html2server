import * as nats from "https://deno.land/x/nats/src/mod.ts";
const nc = await nats.connect({ servers: "demo.nats.io:4222" });
const sc = nats.StringCodec();

const s1 = nc.subscribe("help.*.system");
const s2 = nc.subscribe("help.me.*");
const s3 = nc.subscribe("help.>");

async function printMsgs(s) {
  let subj = s.getSubject();
  console.log(`listening for ${subj}`);
  const c = (13 - subj.length);
  const pad = "".padEnd(c);
  for await (const m of s) {
    console.log(
      `[${subj}]${pad} #${s.getProcessed()} - ${m.subject} ${
        m.data ? " " + sc.decode(m.data) : ""
      }`,
    );
  }
}

nc.publish("help.me.ccc", sc.encode("help from ccc"));
nc.publish("help.ccc.system", sc.encode("help from ccc.system"));
nc.publish("admin.ccc.root", sc.encode("help from admin"));

printMsgs(s1);
printMsgs(s2);
printMsgs(s3);

await nc.closed();