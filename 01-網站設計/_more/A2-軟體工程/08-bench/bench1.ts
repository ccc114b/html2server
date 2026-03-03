// import { runBenchmarks, bench } from "https://deno.land/std/testing/bench.ts";

Deno.bench("forIncrementX1e8", function() {
  for (let i = 0; i < 1e8; i++);
});

// runBenchmarks();