---
title: "Hugo入門"
date: 2022-05-27T09:55:03+08:00
draft: true
---

## 安裝

請到此處下載適合你電腦的 Hugo 版本安裝

https://github.com/gohugoio/hugo/releases


## 使用 -- 建立 quick-start 網站

* https://gohugo.io/getting-started/quick-start/

```
$ hugo version
$ hugo new site quickstart
$ cd quickstart/
$ git init
$ git submodule add https://github.com/theNewDynamic/gohugo-theme-ananke.git themes/ananke
$ echo theme = \"ananke\" >> config.toml
$ hugo new posts/my-first-post.md
$ hugo server -D
```

然後就可以看到網站了，接著可繼續加

```
$ hugo new posts/my-second-post.md
// 然後用編輯器編輯 content/posts/my-second-post.md

```

網站會立即更新！

## 匯出靜態網站

```
   60  hugo -D
   63  cd public
   64  file_server .
```

