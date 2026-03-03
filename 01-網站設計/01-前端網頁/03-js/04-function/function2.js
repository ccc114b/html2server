function max(a,b) {
    if (a > b) return a
    return b
}

let f = max

let g = function (a,b) {
    if (a > b) return a
    return b
}

console.log('f(3,5)=', f(3,5))

console.log('g(3,5)=', g(3,5))

