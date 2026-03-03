// import * as _ from 'lodash'
const _ = require("lodash")

let r1 = _.defaults({ 'a': 1 }, { 'a': 3, 'b': 2 });
// → { 'a': 1, 'b': 2 }
console.log('r1=', r1)
let r2 = _.partition([1, 2, 3, 4], n => n % 2);
// → [[1, 3], [2, 4]]
console.log('r2=', r2)
