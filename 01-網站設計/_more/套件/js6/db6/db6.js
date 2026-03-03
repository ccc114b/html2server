const Nedb = require('nedb')

const db6 = module.exports = {}

db6.table = function (tbName) {
  var tb = db6[tbName] 
  if (tb) return tb
  db6[tbName] = tb = new Nedb()
  return tb
}

function promisify(func) {
  return function() {
    var args = [...arguments]
    var tbName = args.shift()
    var table = db6.table(tbName)
    var f = func.bind(table)
    return new Promise(function (resolve, reject) {
      // 下面這行會強制塞入 callback function, 導致 db6 不傳回 cursor 而傳回 exec 解完後的值。
      args.push(function (err, result) {
        if (err) reject(err); else resolve(result);
      })
      f(...args)
    })
  }
}

db6.insert = promisify(Nedb.prototype.insert)
db6.findOne = promisify(Nedb.prototype.findOne)
db6.count = promisify(Nedb.prototype.count)
db6.update = promisify(Nedb.prototype.update)
db6.remove = promisify(Nedb.prototype.remove)
db6.ensureIndex = promisify(Nedb.prototype.ensureIndex)
db6.removeIndex = promisify(Nedb.prototype.removeIndex)


db6.find = function (tbName, q, options={}) {
  var {sort, skip, limit, projection} = options
  var table = db6.table(tbName)
  var cursor = table.find(q)
  if (sort) cursor = cursor.sort(sort)
  if (skip) cursor = cursor.skip(skip)
  if (limit) cursor = cursor.limit(limit)
  if (projection) cursor = cursor.projection(projection)
  return new Promise(function (resolve, reject) {
    cursor.exec(function (err, result) {
      if (err) reject(err); else resolve(result);
    })
  })
}
