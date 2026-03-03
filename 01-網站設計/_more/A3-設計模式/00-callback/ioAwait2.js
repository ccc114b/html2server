var text = await Deno.readTextFile('./hello.txt')
console.log('text=', text)
await Deno.writeTextFile('./hello_await.txt', text)
console.log('copy success!')

