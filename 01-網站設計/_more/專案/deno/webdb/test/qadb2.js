import {sqlFetch} from '../lib/sql.js'

async function main() {
    await sqlFetch("CREATE TABLE IF NOT EXISTS QA (Q TEXT, A TEXT)")
    await sqlFetch("INSERT INTO QA VALUES ('Hello!', 'Hi!')")
    await sqlFetch("INSERT INTO QA VALUES ('你好', '我很好')")
    await sqlFetch("SELECT * FROM QA")
}

main()
