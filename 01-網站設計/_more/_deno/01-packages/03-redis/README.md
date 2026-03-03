

* https://redis.io/docs/install/install-redis/install-redis-on-mac-os/

## redis1.js

```
$ deno run -A redis
1.js
Warning Implicitly using latest version (v0.32.0) for https://deno.land/x/redis/mod.ts
get(hoge)= fuga
```

## pub/sub

sub

```
$ deno run -A redisSub.js
subscribe ccckmit ...

```

pub

```
$ deno run -A redisPub.js
```

然後 sub 那邊就變成

```
$ deno run -A redisSub.js
subscribe ccckmit ...

channel=ccckmit message=hello
channel=ccckmit message=world

```
