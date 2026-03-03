// const res = await fetch('https://jsonplaceholder.typicode.com/todos/1')
const res = await fetch('https://www.twse.com.tw/exchangeReport/STOCK_DAY?response=json&date=20230425&stockNo=2330');
// const res = await fetch('https://example.com/');
const data = await res.text(); // res.json()
console.log(data)