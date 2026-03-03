
* https://deno.com/blog/build-crud-api-oak-denokv (讚!)

```

* https://deno-blog.com/A_Comprehensive_Guide_to_Deno_KV.2023-06-30#kv-on-deno-deploy
* https://deno.com/blog/building-deno-kv


* https://github.com/denoland/deno/tree/main/ext/kv#kv-connect
    * https://github.com/denoland/denokv/tree/main/sqlite

1. Connect to managed databases from outside of Deno Deploy

You can connect to your Deno Deploy KV database from your Deno application outside of Deno Deploy. To open a managed database, set the DENO_KV_ACCESS_TOKEN environment variable to a Deno Deploy personal access token and provide the URL of the database to Deno.openKv:

```js
const kv = await Deno.openKv(
  "https://api.deno.com/databases/<database-id>/connect",
);
```

Please check the docs for the specification of the protocol for connecting to a remote KV database

* https://github.com/denoland/denokv
    * A self-hosted backend for Deno KV, the JavaScript first key-value database:
