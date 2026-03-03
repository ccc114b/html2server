# Blog -- AJAX+Flask 版

用 ChatGPT 寫的

對話 -- https://chat.openai.com/share/d58c23b9-33f0-4082-8e4c-5bea7c2be2ee

然後發現有錯，因為原本靜態網頁放在 public 下， flask 預設在 static 下

所以我將 public 改為 static 就行了

參考 -- https://stackoverflow.com/questions/24578330/flask-how-to-serve-static-html

## install

```
$ pip install Flask
```

## run

```
$ flask --app app run
 * Serving Flask app 'app'
 * Debug mode: off
WARNING: This is a development server. Do not use it in a production deployment. Use a
production WSGI server instead.
 * Running on http://127.0.0.1:5000
Press CTRL+C to quit
127.0.0.1 - - [04/Dec/2023 13:58:26] "GET / HTTP/1.1" 200 -
127.0.0.1 - - [04/Dec/2023 13:58:27] "GET /main.css HTTP/1.1" 200 -
127.0.0.1 - - [04/Dec/2023 13:58:27] "GET /main.js HTTP/1.1" 200 -
127.0.0.1 - - [04/Dec/2023 13:58:27] "GET /list HTTP/1.1" 200 -
127.0.0.1 - - [04/Dec/2023 13:58:35] "POST /post HTTP/1.1" 201 -
127.0.0.1 - - [04/Dec/2023 13:58:35] "GET /list HTTP/1.1" 200 -
127.0.0.1 - - [04/Dec/2023 13:58:36] "GET /post/3 HTTP/1.1" 200 -
127.0.0.1 - - [04/Dec/2023 13:58:38] "GET /list HTTP/1.1" 200 -
```

## run in e320 mac

```
(base) nqucsie2022@NeXT11 02-flaskblog % python3 -m flask --app app run
 * Serving Flask app 'app'
 * Debug mode: off
WARNING: This is a development server. Do not use it in a production deployment. Use a production WSGI server instead.
 * Running on http://127.0.0.1:5000
Press CTRL+C to quit
```
