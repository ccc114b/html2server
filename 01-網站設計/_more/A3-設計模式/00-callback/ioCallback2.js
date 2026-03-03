Deno.readTextFile('./hello.txt').then(function (text) {
  console.log(text)
  Deno.writeTextFile('./hello_copy.txt', text).then(function () {
    console.log('copy success!')
  })
})