// ================= cache =======================
const cache = {
  map: new Map()
}

function cacheLoad(key) {
  var value = cache.map.get(key)
  if (value != null) return value
}

function cacheSave(key, value) {
  cache.map.set(key, value)
}

// ============= db (Database) ==================
function normal(key) {
  return key.toLowerCase() // 轉小寫，正規化！
}

function saveLocal(key, value) {
  var k = normal(key)
  cacheSave(k, value)
  localStorage.setItem(k, JSON.stringify(value))
}

function loadLocal(key) {
  var k = normal(key)
  var value = cacheLoad(k, value)
  if (value != null) return value
  var json = localStorage.getItem(k)
  if (json != null) {
    value = JSON.parse(json)
    cacheSave(k, value)
    return value
  }
  return null
}

export function save(key, value) {
  saveLocal(key, value)
}

export function load(key) {
  return loadLocal(key)
}

export function add(key, n) {
  var k = normal(key)
  var value = load(k)
  if (value == null) return null
  value += n
  save(k, value)
  return value
}
