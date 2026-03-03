function range(from, to, step=1) {
  let r = []
  for (let i = from; i<to; i+=step) {
    r.push(i)
  }
  return r
}

console.log('range(1,5)=', range(1,5))
for (let i of range(1,5)) {
  console.log('i=',i)
}
for (let i of range(1,999999999)) {
  if (i==5) break
  console.log('i=',i)
}