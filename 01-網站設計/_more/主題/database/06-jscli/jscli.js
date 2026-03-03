while (true) {
    let cmd = prompt("js>")
    if (cmd == 'exit') break
    let result = eval(cmd)
    console.log(result)
}
