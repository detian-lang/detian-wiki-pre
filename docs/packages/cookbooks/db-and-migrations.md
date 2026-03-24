---
title: db and Migrations
description: Use SQLite, transactions, queries, and migration tracking through the db package.
---

# db and Migrations

The `db` package is one of the most practically useful Detian packages.

## 1. Open a connection

```detian
load "db" as db;
var#conn = db.sqlite.open("/tmp/demo.sqlite");
```

## 2. Run schema setup or migration bootstrap

```detian
db.sqlite.script(conn, "
  create table if not exists users (
    id integer primary key,
    name text not null
  );
");
```

## 3. Transactions

```detian
var#tx = db.sqlite.begin(conn);
db.sqlite.exec(tx, "insert into users(name) values(?1)", "Detian");
db.sqlite.commit(tx);
```

## 4. Query rows and scalars

```detian
var#rows = db.sqlite.query(conn, "select id, name from users order by id");
int#count = db.sqlite.scalar(conn, "select count(*) from users");
```

## 5. Migrations

```detian
db.migrate.init(conn);
var#pending = db.migrate.pending(conn, migrations);
db.migrate.apply(conn, migrations);
```

## Good use cases

- local internal tools
- deterministic demos
- durable queues/caches through package composition
- report generation pipelines
