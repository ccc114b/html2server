import * as db from './db.js'

let users = [
    ["ccc", "123", "ccc@gmail.com"],
    ["tim", "321", "tim@gmail.com"],
]

db.open()
db.clear()

for (let [user, pass, email] of users) {
    db.userAdd({user, pass, email})
}
console.log('users=', db.userList())
db.close()
