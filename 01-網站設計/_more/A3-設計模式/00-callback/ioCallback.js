Deno.readTextFile('./hello.txt').then(function (text) {
  console.log(text)
})
console.log('step2')
/*
f(function callback() {
   g(function callback() {
     h(function callback() {
       
     })
   })
})
*/