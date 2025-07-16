import { DB } from "https://deno.land/x/sqlite/mod.ts";

// Open a database
const db = new DB("blog.db");
db.query(`CREATE TABLE IF NOT EXISTS posts (
    id INTEGER PRIMARY KEY AUTOINCREMENT, 
    time DATETIME DEFAULT CURRENT_TIMESTAMP,
    title TEXT,
    body TEXT
    )
`);

const posts = [
    {title:'aaa', body:'aaaaa'},
    {title:'bbb', body:'bbbbb'},
    {title:'ccc', body:'ccccc'}
];

// Run a simple query
for (const post of posts)
  db.query("INSERT INTO posts (title, body) VALUES (?,?)", [post.title, post.body]);

// Print out data in table
for (const [id, time, title, body] of db.query("SELECT id, time, title, body FROM posts"))
  console.log(id, time, title, body);

// Close connection
db.close();
