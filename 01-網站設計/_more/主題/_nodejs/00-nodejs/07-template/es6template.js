function person(name, age) {
  const template = `
person: 
  name: ${name}
  age : ${age}
`
  return template
}

console.log(person('ccc', 50))

