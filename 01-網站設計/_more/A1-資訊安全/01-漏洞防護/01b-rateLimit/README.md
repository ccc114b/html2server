

## deno

使用 oak_rate_limit

* https://deno.land/x/oak_rate_limit@v0.1.1

```js
mport { RateLimiter } from "https://deno.land/x/oak_rate_limit/mod.ts";

const rateLimit = RateLimiter({
  store: STORE, // Using MapStore by default.
  windowMs: 1000, // Window for the requests that can be made in miliseconds.
  max: 10, // Max requests within the predefined window.
  headers: true, // Default true, it will add the headers X-RateLimit-Limit, X-RateLimit-Remaining.
  message: "Too many requests, please try again later.", // Default message if rate limit reached.
  statusCode: 429, // Default status code if rate limit reached.
});

app.use(await rateLimit);
```

## 參考

* https://medium.com/@animirr/brute-force-protection-node-js-examples-cd58e8bd9b8d
    * Block source of requests by IP

* https://stackoverflow.com/questions/58897546/nodejs-ws-library-how-to-prevent-brute-force-attack-both-for-passwords-and-f

* https://levelup.gitconnected.com/prevent-brute-force-attacks-in-node-js-419367ae35e6
    1. Brute Forcing one specific user from one IP: 使用 express-rate-limit
    2. Brute Forcing one specific user from different IPs (加用 redis)
    3. DDOS: https://phoenixnap.com/blog/prevent-ddos-attacks

