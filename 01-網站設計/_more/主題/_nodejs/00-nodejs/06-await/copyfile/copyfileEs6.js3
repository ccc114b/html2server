var fs = require('fs')

async function main() {
  var data1 = await fs.promises.readFile("copyfileEs6.js", "utf8");
  console.log('讀取完成!');
  await fs.promises.writeFile("copyfileEs6.js2", data1);
  console.log('寫入完成!');
  var data2 = await fs.promises.readFile("copyfileEs6.js2", "utf8");
  console.log('又讀取完成 !');
  await fs.promises.writeFile("copyfileEs6.js3", data2);
  console.log('又寫入完成!');
}

main();