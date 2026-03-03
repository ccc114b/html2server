import { DB } from "https://deno.land/x/sqlite/mod.ts";

let db = null

while (true) {
    let cmd = prompt("sql>")
    try {
        let args = cmd.split(' ')
        let op = args[0]
        if (op == 'exit')
            break
        else if (op == 'open')
            db = new DB(args[1])
        else {
            let table = db.query(cmd, [])
            for (let row of table) {
                console.log(row)
            }
        }    
    } catch (error) {
        console.log(`error:${cmd} , run fail! try again ...`)
    }
}

