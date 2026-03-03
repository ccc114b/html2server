DB = {
    mode:'local'
}

DB.get = async function(key) {
    if (DB.mode == 'local') {
        return JSON.parse(localStorage.getItem(key))
    } else {
        let r = await window.fetch(key)
        return await r.json()
    }
}

DB.set = async function(key, value) {
    if (DB.mode == 'local') {
        return localStorage.setItem(key, JSON.stringify(value))
    } else {
        let r = await window.fetch(key, {
            body: JSON.stringify(value),
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            }
          })
        return r
    }
}
