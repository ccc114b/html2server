# Hugo 新版

參考我的架站 

* https://ccckmit.github.io/myhugo/

還有架站的過程說明

* https://github.com/ccckmit/myhugo/tree/master

還有

* https://cccsite.github.io/cccsite/

還有架站的過程說明

* https://github.com/cccsite/


# Hugo 舊版


## Install

* https://github.com/gohugoio/hugo/releases

## First Site

* https://gohugo.io/getting-started/quick-start/

```
   47  hugo version
   48  hugo new site quickstart
   51  cd quickstart/
   55  git init
   56  git submodule add https://github.com/theNewDynamic/gohugo-theme-ananke.git themes/ananke
   57  echo theme = \"ananke\" >> config.toml
   58  hugo new posts/my-first-post.md
   59  hugo server -D
```

然後就可以看到網站了，接著可繼續加

```
$ hugo new posts/my-second-post.md
// 然後用編輯器編輯 content/posts/my-second-post.md

```

網站會立即更新！

## static site

```
   60  hugo -D
   63  cd public
   64  file_server .
```

## 上傳到 github

若要 host 在 github 請參考

* https://gohugo.io/hosting-and-deployment/hosting-on-github/

我們必須放在組織或帳號的專案下，不能放在一般專案下：

名字像是 `https://<USERNAME|ORGANIZATION>.github.io/`

例如我的專案是

* https://github.com/ccc-site/ccc-site.github.io/

設好 github pages 之後，就可以看到出版的網站：

* https://ccc-site.github.io/


