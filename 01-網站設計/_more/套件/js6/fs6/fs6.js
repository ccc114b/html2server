import { walk } from "https://deno.land/std@0.80.0/fs/mod.ts"

export async function dirList(fpath) {
  let list = []
  for await (let entry of walk(fpath)) {
    list.push(entry)
  }
  return list
}
