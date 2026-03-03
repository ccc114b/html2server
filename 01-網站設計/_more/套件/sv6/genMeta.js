import * as path from "https://deno.land/std/path/mod.ts"

export async function genMeta(root) {
  let entries = []
  for await (const entry of Deno.readDir(root)) {
    let {name, isDirectory} = entry
    entries.push({name, isDirectory})
    if (entry.isDirectory) {
      genMeta(`${root}/${entry.name}`)
    }
  }
  let meta = { entries }
  Deno.writeTextFile(`${root}/meta.json`, JSON.stringify(meta, null, 2))
}

genMeta(`${path.join(Deno.cwd(), Deno.args[0])}`)
