let cmd = new Deno.Command("ls", {args:['-all']})
cmd.spawn()
