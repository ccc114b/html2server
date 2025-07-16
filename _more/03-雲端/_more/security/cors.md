# CORS

在 deno 中可以使用 https://deno.land/x/cors 來控制 CORS


## fetch api 必須在同一網站中執行，否則瀏覽器會禁止。

* https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS

An example of a cross-origin request: the front-end JavaScript code served from https://domain-a.com uses XMLHttpRequest to make a request for https://domain-b.com/data.json.

For security reasons, browsers restrict cross-origin HTTP requests initiated from scripts. For example, XMLHttpRequest and the Fetch API follow the same-origin policy. This means that a web application using those APIs can only request resources from the same origin the application was loaded from unless the response from other origins includes the right CORS headers.

## 要允許跨站存取，必須加上表頭

https://bar.example

```
Access-Control-Allow-Origin: https://foo.example
```

若用 * 則太危險了，大家都可以用！

```
Access-Control-Allow-Origin: *
```

This pattern of the Origin and Access-Control-Allow-Origin headers is the simplest use of the access control protocol. If the resource owners at https://bar.other wished to restrict access to the resource to requests only from https://foo.example (i.e., no domain other than https://foo.example can access the resource in a cross-origin manner), they would send:

Access-Control-Allow-Origin: https://foo.example