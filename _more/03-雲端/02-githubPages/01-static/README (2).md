# 架站

## Github Pages (好用)

到專案的 Settings 選 Github Pages 將 Source: None 改為 Source: master，這樣就可以在 

* https://帳號.github.io/專案名稱/ 

當中看到對應的網頁。

例如:

* 網站 -- https://ccccourse.github.io/wp/
    * 範例網頁 -- https://ccccourse.github.io/wp/code/01-html/form.htm

如果要做得更好，可以用架站套件，jamstack 裡有一大堆：

* https://jamstack.org/

像是 Hugo

* https://gohugo.io/
* https://www.gohugo.org/


## Linode 虛擬主機 -- 需要每月 $5 美元 (需輸入信用卡結帳，郵局的國際提款卡亦可)

蠻推薦的，雖然要錢，但是可以學到很多技術，又有虛擬主機可用 (可架站、遠端 linux 卻不需要安裝虛擬機) 很值得！

* https://www.linode.com/

## Gitlab Pages (感覺不好用)

* 架站 -- https://docs.gitlab.com/ee/user/project/pages/index.html
    * 建站工具
    * hexo: https://pages.gitlab.io/hexo
    * gitbook: https://pages.gitlab.io/gitbook/
    * https://gitlab.com/pages/gitbook

方法請參考下列文章

* [GitLag Pages，生成靜態頁3+2步驟](https://letswrite.tw/gitlab-pages/)

摘要如下

GitLab要生成靜態頁，主要三步驟如下：

1. 專案上建立一個「public」資料夾，把要生成靜態頁的檔案，都放在這個資料夾內。
2. 專案的根目錄，新增一個 .gitlab-ci.yaml 的檔案。
3. 專案push到GitLab上。

另外的二個步驟，其實就是等待GitLab的處理：

1. 等gitlab pipelines顯示狀態為「passed」
2. 輸入GitLab Pages產生靜態頁後的網址，看到頁面

