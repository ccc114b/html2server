import { serve } from "https://deno.land/std@0.140.0/http/server.ts";

// Make a TCP connection to example.com
const connection = await Deno.connect({
    port: 80,
    hostname: "example.com",
})

// Send raw HTTP GET request.
const request = new TextEncoder().encode(
    "GET / HTTP/1.1\nHost: example.com\r\n\r\n",
)

const bytesWritten = await connection.write(request)

console.log('bytesWritten=', bytesWritten)
const responseBytes=new Uint8Array(100000)
const n=await connection.read(responseBytes)
console.log('n=', n)
let responseText = new TextDecoder().decode(responseBytes);
console.log('responseText=', responseText)
