

## sqlite

* https://docs.deno.com/runtime/manual/basics/connecting_to_databases

```js
import { Database } from "https://deno.land/x/sqlite3@LATEST_VERSION/mod.ts";
const db = new Database("test.db");
db.close();
```

```js
import { DB } from "https://deno.land/x/sqlite/mod.ts";
const db = new DB("test.db");
db.close();
```

* https://deno.com/blog/build-crud-api-oak-denokv (讚!)

## denodb

* https://deno.land/x/denodb@v1.4.0
    *  This project is not actively maintained: expect issues, and delays in reviews

DenoDB is a Deno-specific ORM.

```js
import {
  Database,
  DataTypes,
  Model,
  PostgresConnector,
} from "https://deno.land/x/denodb/mod.ts";

const connection = new PostgresConnector({
  host: "...",
  username: "user",
  password: "password",
  database: "airlines",
});

const db = new Database(connection);
```

## PG

```js
import postgres from "https://deno.land/x/postgresjs/mod.js";
const sql = postgres("postgres://username:password@host:port/database");
```