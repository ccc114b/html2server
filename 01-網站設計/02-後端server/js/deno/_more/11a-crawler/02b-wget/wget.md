# wget

## example.com
(base) $ wget -r http://example.com
--2022-12-09 10:49:08--  http://example.com/
正在查找主機 example.com (example.com)... 93.184.216.34
正在連接 example.com (example.com)|93.184.216.34|:80... 連上了。
已送出 HTTP 要求，正在等候回應... 200 OK
長度: 1256 (1.2K) [text/html]
儲存到：`example.com/index.html'

example.com/i 100%   1.23K  --.-KB/s  於 0s          

2022-12-09 10:49:08 (133 MB/s) - 已儲存 `example.com/index.html' [1256/1256]

完成 --2022-12-09 10:49:08--
總計 clock 時間：0.4s

## wget 禮貌版

```
wget -w 2 -r http://www.nqu.edu.tw
```

## wikipedia.org

```
wget -w 2 -e robots=off -r https://zh.wikipedia.org/
```
