function f(n) {
    return n*n
}

console.log('f(2)=', f(2))
let g = f
console.log('g(2)=', g(2))

let f2 = function (n) {
    return n*n
}
console.log('f2(2)=', f2(2))

console.log('n*n=', (function (n) {
    return n*n
})(2))