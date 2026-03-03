async function* range(from, to, step=1) {
    for (let i = from; i<to; i+=step) {
        yield await i
    }
}

  
for await (const i of range(1,5)) {
    console.log('await i=', i)
}
