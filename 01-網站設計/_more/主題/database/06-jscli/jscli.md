
```
$ deno run -A shell.js
shell> ls
command.js  shell.js  system.js
shell> ls -all
total 7
drwxr-xr-x 1 ccckmit 197121   0 五月    2 10:51 .
drwxr-xr-x 1 ccckmit 197121   0 五月    2 10:32 ..
-rw-r--r-- 1 ccckmit 197121  64 五月    2 10:52 command.js
-rw-r--r-- 1 ccckmit 197121 276 五月    2 10:59 shell.js
-rw-r--r-- 1 ccckmit 197121 199 五月    2 10:58 system.js
shell> cat shell.js
async function system(cmd) {
    let args = cmd.split(' ')
    let child = new Deno.Command(args[0], {args:args.slice(1)})
    return await child.spawn().output()
}

while (true) {
    let cmd = prompt("shell>")
    if (cmd == 'exit') break
    await system(cmd)
}
shell> exit
```
