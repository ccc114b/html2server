async function system(cmd) {
    let args = cmd.split(' ')
    let child = new Deno.Command(args[0], {args:args.slice(1)})
    return await child.spawn().output()
}

await system('ls -all')

