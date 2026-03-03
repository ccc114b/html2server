class Circle {
  constructor(r) {
    this.r = r
  }
  area() {
    let {r} = this
    return Math.PI * r * r
  }
}

let c2 = new Circle(2)

console.log('c2.area()=', c2.area())
