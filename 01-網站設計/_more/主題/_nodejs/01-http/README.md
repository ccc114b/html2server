# HTTP 協定

## 01-koaServer

本課程主要採用 Node.js 中的 koa 作為伺服器框架，範例 01-koaServer 展示了一個最簡單的 koaServer 寫法。

* [01-koaServer](01-koaServer)

## 02-httpServer

看過 koa 的 server 寫法後，您可能會有個疑問， koa 到底是怎麼寫出來的呢？

這個問題並不容易，但是簡而言之， koa 是建築在 node.js 的 http 模組之上的。

我們也可以直接用 node.js 的 http 模組來寫伺服器，於是有了 02-httpServer 範例。

* [02-httpServer](02-httpServer)

## 03-tcpServer

但是、你心中可能還是有個疑問，那 http 模組到底是怎麼寫出來的呢？

當你不斷追問《xxx 是怎麼寫出來的》時，常常會發現是《一層包著一層》，這也就是軟體的層次性。

網路程式更是如此，您應該還記得 [OSI 網路的七層架構](https://zh.wikipedia.org/wiki/OSI%E6%A8%A1%E5%9E%8B) ，就是這樣一層包一層的結果。

但是目前的 Internet 所採用的是 [TCP/IP 架構](https://zh.wikipedia.org/wiki/TCP/IP协议族) ， 主要分成四層，以 HTTP 協定而言，其層次如下。

HTTP => TCP => IP => 實體層

由於 HTTP 是架設在 TCP 之上的，如果採用 TCP 來實作，我們也可以設計出自己的 web server ，這就是 03-tcpServer 範例所展示的。

* [03-tcpServer](02-tcpServer)

該範例使用了一個 [稱為 net 的 node.js 模組](https://nodejs.org/api/net.html) ， 裡面有一個 [稱為 Socket 的物件](https://nodejs.org/api/net.html#net_class_net_socket) ，  [Socket 是 Internet 發展早期由美國柏克萊大學所設計的一組函式庫](https://zh.wikipedia.org/wiki/%E7%B6%B2%E8%B7%AF%E6%8F%92%E5%BA%A7) (當時採用 C 語言撰寫)，後來這個概念在很多程式語言中都被實作出來 (包含 java, c#, ruby, python, node.js, ....)。

## curl

但是，以上的 server 範例，只展示了 http 協定的一半，也就是 client/server 中的 server 部分。

在 client 部分，我們使用《瀏覽器》進行操作，而不是自己寫程式。

但是使用瀏覽器比較不容易看清楚底層的運作原理，我們可以改用 curl 程式來觀察 server 到底傳回了甚麼？

(在 Windows 中，您可以使用 choco install curl 指令來安裝 curl 套件)

* https://chocolatey.org/packages/curl

```
PS D:\ccc\course\nodejs\code\01-http> curl http://localhost:3000/


StatusCode        : 200
StatusDescription : OK
Content           : Hello World
RawContent        : HTTP/1.1 200 OK
                    Connection: keep-alive
                    Content-Length: 11
                    Content-Type: text/plain; charset=utf-8
                    Date: Tue, 27 Aug 2019 12:02:40 GMT

                    Hello World
Forms             : {}
Headers           : {[Connection, keep-alive], [Content-Length, 11], [Content-Type, text/plain; charset=utf-8], [Date, Tue, 27 Aug 2019 12:02:40
                     GMT]}
Images            : {}
InputFields       : {}
Links             : {}
ParsedHtml        : System.__ComObject
RawContentLength  : 11

```

其中 RawContent 是 http 協定中伺服器回傳的原始訊息，其格式很簡單，就是用一個空行隔開表頭和內容。

```
HTTP/1.1 200 OK
Connection: keep-alive
Content-Length: 11
Content-Type: text/plain; charset=utf-8
Date: Tue, 27 Aug 2019 12:02:40 GMT

Hello World
```

但是，瀏覽器和 curl 到底傳送了甚麼給伺服器，才能讓他傳回上述結果呢？

我們可以用更原始一點的工具來觀察，那就是 telnet ，讓我們先安裝一下 telnet

```
PS D:\ccc> choco install telnet
Chocolatey v0.10.11
Installing the following packages:
telnet
By installing you accept licenses for the packages.
Progress: Downloading telnet 0.9.0... 100%

telnet v0.9.0 [Approved]
telnet package files install completed. Performing other installation steps.
The package telnet wants to run 'chocolateyinstall.ps1'.
Note: If you don't run this script, the installation will fail.
Note: To confirm automatically next time, use '-y' or consider:
choco feature enable -n allowGlobalConfirmation
Do you want to run the script?([Y]es/[N]o/[P]rint): y

 The install of telnet was successful.
  Software install location not explicitly set, could be in package or
  default install location if installer.

Chocolatey installed 1/1 packages. 
 See the log for details (C:\ProgramData\chocolatey\logs\chocolatey.log).
```

接著當我們打入以下 telnet 指令時

```
PS D:\ccc> telnet 127.0.0.1 3000
```

會看到如下輸出

```
HTTP/1.0 200 OK
Content-Type: text/plain
Content-Length: 12

Hello World!
```

這大致上就是 curl 和瀏覽器傳給伺服器的訊息了。

注意：在 windows 中可能會看到以下奇怪的輸出格式，那是因為 windows 用 \r\n 當作換行字元，但是我們的程式回應只有 \n (到下一行)，所以就少到 \r 的《回到行首》的功能了。

```

HTTP/1.0 200 OK
               Content-Type: text/plain
                                       Content-Length: 12

                                                         Hello World!
```


理解了上述對 http client/server 協定的描述之後，我們就可以自己寫程式來實作 httpClient 了。

## 04-httpClient

首先是用 http 模組來實作 client 的 04-httpClient 範例。

* [04-httpClient](02-httpClient)

## 05-tcpClient

接著用更原始的 net (socket) 模組來實作 client 

* [05-tcpClient](05-tcpClient)

您可以看到我們的主要程式碼

```
client.connect(3000, '127.0.0.1', function() {
	console.log('> Connected');
	client.write('GET /xxx/yyy.html HTTP/1.0\n\n');
})
```

其中 `client.write('GET /xxx/yyy.html HTTP/1.0\n\n')` 送出下列訊息

```
GET /xxx/yyy.html HTTP/1.0

```

也就是最簡單的 HTTP 請求表頭，最後再補上一個空行，就能向 HTTP 伺服器要求回應訊息了。

## 06-curl

如果我們把 05-tcpClient 改一下，就可以得到一個類似 curl 的通用工具了。

這就是 `06-curl/curl.js` 程式的用途了。

案例 1

```
PS D:\ccc\course\nodejs\code\01-httpProtocol> node curl misavo.com 80 /
> Connected
> Received:
HTTP/1.1 200 OK
Content-Length: 177
Last-Modified: Wed, 12 Dec 2018 08:40:44 GMT
Cache-Control: max-age=0
Content-Type: text/html; charset=utf-8
Date: Tue, 27 Aug 2019 08:06:31 GMT
Connection: close

<html>
<head>
<!-- <meta http-equiv="refresh" content="0; url=/view/ccc/README.md" /> -->
</head>
<body>
<script>
location.href = '/view/ccc/README.md'
</script>
</body>
</html>
> Connection closed
```

案例 2

先啟動 httpServer.js

```
PS D:\ccc\course\nodejs\code\01-http\03-tcpServer> node tcpServer
Server running at http://localhost:3000/
```

然後在另一個 console 執行

```
PS D:\ccc\course\nodejs\code\01-http\06-curl> node curl localhost 3000 /xxx/yyy.html
> Connected
> Received:
HTTP/1.0 200 OK
Content-Type: text/plain
Content-Length: 12

Hello World!
> Connection closed
```

## 更多使用 curl 的範例

```
PS D:\ccc\course\nodejs\code\01-httpProtocol> curl http://misavo.com


StatusCode        : 200
StatusDescription : OK
Content           : <html>
                    <head>
                    <!-- <meta http-equiv="refresh" content="0; url=/view/ccc/README.md" /> -->
                    </head>
                    <body>
                    <script>
                    location.href = '/view/ccc/README.md'
                    </script>
                    </body>
                    </html>
RawContent        : HTTP/1.1 200 OK
                    Connection: keep-alive
                    Content-Length: 177
                    Cache-Control: max-age=0
                    Content-Type: text/html; charset=utf-8
                    Date: Tue, 27 Aug 2019 08:33:12 GMT
                    Last-Modified: Wed, 12 Dec 2018 08:...
Forms             : {}
Headers           : {[Connection, keep-alive], [Content-Length, 177], [Cache-Control, max-age=0], [Content-Type, text/html; charset=utf-8]...}
Images            : {}
InputFields       : {}
Links             : {}
ParsedHtml        : System.__ComObject
RawContentLength  : 177
```

案例 2 : 

```
PS D:\ccc\course\nodejs\code\01-httpProtocol> curl https://msn.com


StatusCode        : 200
StatusDescription : OK
Content           : <?xml version="1.0" encoding="UTF-8" ?>
                    <!DOCTYPE HTML PUBLIC "-//WAPFORUM//DTD XHTML Mobile 1.2//EN" "http://www.openmobilealliance.org/tech/DTD/xhtml-mobile12.dtd
                    ">
                    <html xmlns="http://www.w3.org/...
RawContent        : HTTP/1.1 200 OK
                    Pragma: no-cache
                    Vary: User-Agent
                    Content-Length: 50559
                    Cache-Control: no-cache, no-store, no-transform
                    Content-Type: text/html; charset=utf-8
                    Expires: -1
                    Set-Cookie: Preference...
Forms             : {srchfrm, , id38a7b6cffc6c4800b88a964383879a5f}
Headers           : {[Pragma, no-cache], [Vary, User-Agent], [Content-Length, 50559], [Cache-Control, no-cache, no-store, no-transform]...}
Images            : {@{innerHTML=; innerText=; outerHTML=<IMG alt="" src="//static-global-s-msn-com.akamaized.net/hp-eas/sc/82/c22c7d.gif" width
                    =20 height=20>; outerText=; tagName=IMG; alt=; src=//static-global-s-msn-com.akamaized.net/hp-eas/sc/82/c22c7d.gif; width=20
                    ; height=20}, @{innerHTML=; innerText=; outerHTML=<IMG alt=zh-tw src="//static-global-s-msn-com.akamaized.net/hp-eas/sc/6a/a
                    62410.gif">; outerText=; tagName=IMG; alt=zh-tw; src=//static-global-s-msn-com.akamaized.net/hp-eas/sc/6a/a62410.gif}, @{inn
                    erHTML=; innerText=; outerHTML=<IMG alt=移至巡覽區域 src="//static-global-s-msn-com.akamaized.net/hp-eas/sc/57/a49b8d.gif" w
                    idth=27 height=20>; outerText=; tagName=IMG; alt=移至巡覽區域; src=//static-global-s-msn-com.akamaized.net/hp-eas/sc/57/a49b
                    8d.gif; width=27; height=20}, @{innerHTML=; innerText=; outerHTML=<IMG title=時晴 class=skycond alt=時晴 src="//img-s-msn-co
                    m.akamaized.net/tenant/amp/entityid/BB8MKSg.img?m=6&amp;o=true&amp;u=true&amp;n=true&amp;w=40&amp;h=40" data-icon="3" data-s
                    rc='{"default":"//img-s-msn-com.akamaized.net/tenant/amp/entityid/BB8MKSg.img?m=6&amp;o=true&amp;u=true&amp;n=true&amp;w=40&
                    amp;h=40"}'>; outerText=; tagName=IMG; title=時晴; class=skycond; alt=時晴; src=//img-s-msn-com.akamaized.net/tenant/amp/ent
                    ityid/BB8MKSg.img?m=6&amp;o=true&amp;u=true&amp;n=true&amp;w=40&amp;h=40; data-icon=3; data-src={"default":"//img-s-msn-com.
                    akamaized.net/tenant/amp/entityid/BB8MKSg.img?m=6&amp;o=true&amp;u=true&amp;n=true&amp;w=40&amp;h=40"}}...}
InputFields       : {@{innerHTML=; innerText=; outerHTML=<INPUT id=q name=q>; outerText=; tagName=INPUT; id=q; name=q}, @{innerHTML=; innerText=
                    ; outerHTML=<INPUT type=hidden value=PRTWDL name=form>; outerText=; tagName=INPUT; type=hidden; value=PRTWDL; name=form}, @{
                    innerHTML=; innerText=; outerHTML=<INPUT type=hidden value=1 name=httpsmsn>; outerText=; tagName=INPUT; type=hidden; value=1
                    ; name=httpsmsn}, @{innerHTML=; innerText=; outerHTML=<INPUT type=hidden value=02b1f492dee94c738927dc7f74b3c0a9 name=refig>;
                     outerText=; tagName=INPUT; type=hidden; value=02b1f492dee94c738927dc7f74b3c0a9; name=refig}...}
Links             : {@{innerHTML=首頁; innerText=首頁; outerHTML=<A href="/zh-tw">首頁</A>; outerText=首頁; tagName=A; href=/zh-tw}, @{innerHTML
                    =天氣; innerText=天氣; outerHTML=<A href="/zh-tw/weather">天氣</A>; outerText=天氣; tagName=A; href=/zh-tw/weather}, @{inner
                    HTML=新聞; innerText=新聞; outerHTML=<A href="/zh-tw/news">新聞</A>; outerText=新聞; tagName=A; href=/zh-tw/news}, @{innerHT
                    ML=娛樂; innerText=娛樂; outerHTML=<A href="/zh-tw/entertainment">娛樂</A>; outerText=娛樂; tagName=A; href=/zh-tw/entertain
                    ment}...}
ParsedHtml        : System.__ComObject
RawContentLength  : 50559

```

