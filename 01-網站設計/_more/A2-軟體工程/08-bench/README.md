# deno benchmark

* https://docs.deno.com/runtime/manual/tools/benchmarker

## bench0.js

```
file:///Users/nqucsie2022/Desktop/ccc/html2denojs/A2-%E8%BB%9F%E9%AB%94%E5%B7%A5%E7%A8%8B/08-bench/bench0.js
benchmark           time (avg)        iter/s             (min … max)       p75       p99      p995
-------------------------------------------------------------------- -----------------------------
hello world #1        1.5 µs/iter     664,541.5     (1.39 µs … 2.13 µs)   1.54 µs   2.13 µs   2.13 µs
helloWorld3          1.48 µs/iter     676,318.8     (1.41 µs … 1.61 µs)   1.49 µs   1.61 µs   1.61 µs
hello world #2       1.53 µs/iter     654,467.3     (1.44 µs … 1.64 µs)   1.56 µs   1.64 µs   1.64 µs
hello world #4       1.46 µs/iter     682,617.1      (1.4 µs … 1.58 µs)   1.48 µs   1.58 µs   1.58 µs
hello world #5       1.54 µs/iter     648,894.3     (1.44 µs … 1.61 µs)   1.56 µs   1.61 µs   1.61 µs
helloWorld6          1.52 µs/iter     658,929.1     (1.43 µs … 1.62 µs)   1.53 µs   1.62 µs   1.62 µs
```

## bench1.ts

```
(base) nqucsie2022@NeXT11 08-bench % deno bench -A bench1.ts
Check file:///Users/nqucsie2022/Desktop/ccc/html2denojs/A2-%E8%BB%9F%E9%AB%94%E5%B7%A5%E7%A8%8B/08-bench/bench1.ts
cpu: Intel(R) Core(TM) i5-3470S CPU @ 2.90GHz
runtime: deno 1.38.1 (x86_64-apple-darwin)

file:///Users/nqucsie2022/Desktop/ccc/html2denojs/A2-%E8%BB%9F%E9%AB%94%E5%B7%A5%E7%A8%8B/08-bench/bench1.ts
benchmark             time (avg)        iter/s             (min … max)       p75       p99      p995
---------------------------------------------------------------------- -----------------------------
forIncrementX1e8      96.32 ms/iter          10.4   (95.12 ms … 99.02 ms)  96.92 ms  99.02 ms  99.02 ms
```

