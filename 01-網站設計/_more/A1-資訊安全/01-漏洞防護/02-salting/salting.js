import * as bcrypt from "https://deno.land/x/bcrypt/mod.ts";
var salt = bcrypt.genSaltSync(10);
console.log('salt=', salt)
var hash = bcrypt.hashSync("mypassword123", salt);
console.log('hash=', hash)
var result = bcrypt.compareSync("mypassword123", hash);
console.log('result=', result)
result = bcrypt.compareSync("abcdefg123", hash);
console.log('result=', result)
