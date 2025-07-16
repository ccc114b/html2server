# MiniSearch

MiniSearch is a tiny but powerful in-memory fulltext search engine written in JavaScript

* https://cdn.jsdelivr.net/npm/minisearch@6.3.0

```
$ deno run -A miniSearch1.js
[
  {
    id: 2,
    score: 9.926306505038868,
    terms: [ "zen", "art", "motorcycle" ],
    queryTerms: [ "zen", "art", "motorcycle" ],
    match: { zen: [ "title" ], art: [ "title" ], motorcycle: [ "title" ] },
    title: "Zen and the Art of Motorcycle Maintenance",
    category: "fiction"
  },
  {
    id: 4,
    score: 3.7144222958250506,
    terms: [ "zen", "art" ],
    queryTerms: [ "zen", "art" ],
    match: { zen: [ "title" ], art: [ "title" ] },
    title: "Zen and the Art of Archery",
    category: "non-fiction"
  }
]
```