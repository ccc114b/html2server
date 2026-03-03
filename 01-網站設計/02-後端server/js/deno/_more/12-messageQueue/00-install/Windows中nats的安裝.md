# Windows中nats的安裝

## 方法

```
$ choco install nats-server
...
$ nats-server
```

## 過程

```
ccc@DESKTOP-COUK0VS MINGW64 /d/ccc/ws/12-messageQueue/05-natsWebSocket (master)
$ choco install nats-server
Chocolatey v1.2.0
Installing the following packages:
nats-server
By installing, you accept licenses for the packages.
Progress: Downloading nats-server 2.0.0.20190610... 100%

nats-server v2.0.0.20190610 [Approved]
nats-server package files install completed. Performing other installation steps.
The package nats-server wants to run 'ChocolateyInstall.ps1'.
Note: If you don't run this script, the installation will fail.
Note: To confirm automatically next time, use '-y' or consider:
choco feature enable -n allowGlobalConfirmation
Do you want to run the script?([Y]es/[A]ll - yes to all/[N]o/[P]rint): yes

Downloading nats-server 64 bit
  from 'https://github.com/nats-io/nats-server/releases/download/v2.0.0/nats-server-v2.0.0-windows-amd64.zip'
Progress: 100% - Completed download of C:\Users\ccc\AppData\Local\Temp\chocolatey\nats-server\2.0.0.20190610\nats-server-v2.0.0-windows-amd64.zip (3.37 MB).
Download of nats-server-v2.0.0-windows-amd64.zip (3.37 MB) completed.
Hashes match.
Extracting C:\Users\ccc\AppData\Local\Temp\chocolatey\nats-server\2.0.0.20190610\nats-server-v2.0.0-windows-amd64.zip to C:\ProgramData\chocolatey\lib\nats-server\tools...
C:\ProgramData\chocolatey\lib\nats-server\tools
 ShimGen has successfully created a shim for nats-server.exe
 The install of nats-server was successful.
  Software installed to 'C:\ProgramData\chocolatey\lib\nats-server\tools'

Chocolatey installed 1/1 packages.
 See the log for details (C:\ProgramData\chocolatey\logs\chocolatey.log).

ccc@DESKTOP-COUK0VS MINGW64 /d/ccc/ws/12-messageQueue/05-natsWebSocket (master)        
$ nats-server
[9680] 2022/12/12 09:21:17.661169 [INF] Starting nats-server version 2.0.0
[9680] 2022/12/12 09:21:18.248168 [INF] Git commit [not set]
[9680] 2022/12/12 09:21:18.256182 [INF] Listening for client connections on 0.0.0.0:4222                                                                                      2
[9680] 2022/12/12 09:21:18.258173 [INF] Server id is NAN5Y2ITDCRKTTER77IHNTDHQZ3ZP4US6COWV4I5XYXR5GFRIONOWV4I5XYXR5GFRIONTEOLT
[9680] 2022/12/12 09:21:18.266166 [INF] Server is ready
```

