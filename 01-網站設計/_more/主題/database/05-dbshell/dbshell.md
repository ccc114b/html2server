# dbshell.js

```
$ deno run -A dbshell.js
sql> open main.db
sql> select * from users
[ 3, "ccc", "123", "ccc@gmail.com" ]
[ 4, "tim", "321", "tim@gmail.com" ]
sql> insert into users (user, pass, email) values ('snoopy', '111', 'snoopy@gmail.com')
sql> select * from users
[ 3, "ccc", "123", "ccc@gmail.com" ]
[ 4, "tim", "321", "tim@gmail.com" ]
[ 5, "snoopy", "111", "snoopy@gmail.com" ]
sql> delete from users where user='snoopy'
sql> select * from users
[ 3, "ccc", "123", "ccc@gmail.com" ]
[ 4, "tim", "321", "tim@gmail.com" ]
sql> exit
```
