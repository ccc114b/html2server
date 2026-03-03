let power2 = (x) => x*x
console.log('power2(3)=', power2(3))

let power3 = (x) => { return x*x*x } // 請注意，一定要加 return, 否則會傳回 undefined

console.log('power3(3)=', power3(3))

let max = (a, b) => {
  let r = (a>b) ? a : b
  return r
}

console.log('max(3,5)=', max(3,5))

let min = (a, b) => (a<b) ? a : b

console.log('min(3,5)=', min(3,5))
