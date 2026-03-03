let a = 3, b = 4

let o = {a, b}

let {a:x, b:y} = o

console.log('a=', a, 'b=', b, 'o=', o, 'x=', x, 'y=', y)

let array = [a, b]

let [c, d] = array

console.log('c=', c, 'd=', d)

// [a, b] = [b, a]

let [ta, tb] = [a, b]

console.log('c=', c, 'd=', d)

console.log('ta=', ta, 'tb=', tb)
