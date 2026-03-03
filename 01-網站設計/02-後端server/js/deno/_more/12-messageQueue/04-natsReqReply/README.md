# nats: service

## natsService.ts

```
$ deno run -A natsService.ts
listening for time requests...
listening for admin.* requests [uptime | stop]
[time] handled #1
[admin] #1 handling uptime
[time] handled #2
[admin] #2 handling uptime
```

## natsRequest.ts

``` 
$ deno run -A natsRequest.ts
got response: 2022-12-12T02:27:13.608Z  
admin.uptime: 36316

ccc@DESKTOP-COUK0VS MINGW64 /d/ccc/ws/12-messageQueue/04-natsReqReply (master)  
$ deno run -A natsRequest.ts
got response: 2022-12-12T02:27:26.645Z  
admin.uptime: 49220
```
