export function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

console.log('wait for 3 second!')
sleep(3000).then(function () {
  console.log('wait for 2 second!')
  sleep(2000).then(function () {
    console.log('finished!')
  })
})
