console.log('wait for 3 second!')
setTimeout(function () {
  console.log('wait for 2 second!')
  setTimeout(function () {
    console.log('finished!')
  }, 2000)
}, 3000)