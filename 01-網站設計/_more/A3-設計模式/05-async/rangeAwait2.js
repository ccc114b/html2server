function sleep(ms) {
    //return new Promise(resolve => setTimeout(resolve, ms));
    return new Promise(function(resolve) { 
      setTimeout(resolve, ms)
    });
}

async function* range(from, to, step=1) {
    for (let i = from; i<to; i+=step) {
        await sleep(1000)
        yield await i
    }
}
  
for await (const i of range(1,5)) {
    console.log('await i=', i)
}
