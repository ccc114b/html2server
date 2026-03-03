# Video Streaming

## deno: http

* [Video streaming service in Deno](https://medium.com/deno-the-complete-reference/video-streaming-service-in-deno-7438912b9854)

影片請從下列網址下載，放在 testdata 中的 BigBuckBunny_512kb.mp4 檔案

* https://archive.org/details/BigBuckBunny_328

然後使用下列指令啟動 videoServerHttp.ts

```
$ deno run -A videoServerHttp.ts 
```

接著訪問

* http://localhost:9000/?videoName=BigBuckBunny_512kb.mp4

就可以看到影片播放了！


## deno oak

從下列模組看來好像有支援 streaming 的功能

* https://github.com/oakserver/oak/blob/main/utils/streams.ts

在 body.test.ts 裏有下列測試，看來這就是 streaming 的用法，只是範例只有 hello world，沒有用影片檔案。

```ts
eno.test({
  name: "body - stream - native request",
  async fn() {
    const rBody = "hello world";
    const expected = encoder.encode(rBody);
    const body = new Body(nativeToServer(
      new Request("http://localhost:8080", {
        body: rBody,
        method: "POST",
        headers: { "content-type": "application/octet-stream" },
      }),
    ));
    assert(body.has);
    assertEquals(body.type(), "binary");
    assert(body.stream);
    let actual = new Uint8Array();
    for await (const chunk of body.stream) {
      actual = concat([actual, chunk]);
    }
    assert(timingSafeEqual(actual, expected));
  },
});
```

## Node.js

* https://www.npmjs.com/package/@videojs/http-streaming

* https://blog.logrocket.com/build-video-streaming-server-node/
    * https://github.com/thesmartcoder7/video_streaming_server
* https://github.com/bootstrapping-microservices/video-streaming-example
* https://github.com/jhiesey/videostream
