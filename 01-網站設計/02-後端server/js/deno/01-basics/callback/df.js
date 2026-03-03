function df(f, x, h=0.0001) {
   return (f(x+h)-f(x))/h
}

function square(y) {
  return y*y
}

console.log('df(square, 3)', df(square, 3))
console.log('df(sin(pi/3))', df(Math.sin, Math.PI/3))
