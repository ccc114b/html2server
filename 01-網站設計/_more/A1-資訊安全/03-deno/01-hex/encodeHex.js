import * as h from "https://deno.land/std@0.210.0/encoding/hex.ts";

let text = "abc"
let hex = h.encodeHex(text)
let bytes = h.decodeHex(hex)
let text2 = new TextDecoder().decode(bytes)
console.log(`${text}:encodeHex=${hex}`)
console.log(`${hex}:decodeHex=${text2}`)

