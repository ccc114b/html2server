Cache = {}

Cache.get = async function(key) {
    let json = localStorage.getItem(key)
    if (json == null) return null
    return JSON.parse(json)
}

Cache.set = async function(key, value) {
    if (value == null) localStorage.setItem(key,null)
    return localStorage.setItem(key, JSON.stringify(value))
}
