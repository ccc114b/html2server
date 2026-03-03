// https://deno.land/std@0.210.0/crypto/mod.ts

import { crypto } from "https://deno.land/std@0.210.0/crypto/mod.ts";

// This will delegate to the runtime's WebCrypto implementation.
console.log(
  new Uint8Array(
    await crypto.subtle.digest(
      "SHA-384",
      new TextEncoder().encode("hello world"),
    ),
  ),
);

// This will use a bundled Wasm/Rust implementation.
console.log(
  new Uint8Array(
    await crypto.subtle.digest(
      "BLAKE3",
      new TextEncoder().encode("hello world"),
    ),
  ),
);