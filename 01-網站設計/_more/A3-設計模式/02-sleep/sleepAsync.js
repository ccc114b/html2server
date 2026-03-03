export function sleep(ms) {
  //return new Promise(resolve => setTimeout(resolve, ms));
  return new Promise(function(resolve) { 
    setTimeout(resolve, ms)
  });
}

console.log('wait for 3 second!')
await sleep(3000)
console.log('wait for 2 second!')
await sleep(2000)
console.log('finished!')
