import { serve } from "https://deno.land/std@0.140.0/http/server.ts";

async function handler(request) {
  console.log('============request==========\n', request)
  // Return the bytes as plain text.
  const buffer = new Uint8Array(10000)
  let response = new Response(buffer, {
    headers: {
      "content-type": "text/plain;charset=utf-8",
    }, 
    body: "Hello!"
  })
  console.log('============response=========\n', response)
  return response
}

serve(handler)