import * as pkgx from "https://deno.land/x/libpkgx/mod.ts"

const { run } = pkgx.porcelain;

await run(`python -c 'print("Hello, World!")'`)
