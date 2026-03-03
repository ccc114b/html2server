import { serve } from "https://deno.land/std@0.156.0/http/server.ts";

function handler(req) {
  return new Response("Hello, World!");
}

serve(handler);
