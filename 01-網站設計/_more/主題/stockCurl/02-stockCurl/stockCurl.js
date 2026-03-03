const res = await fetch('https://www.twse.com.tw/exchangeReport/STOCK_DAY?response=json&date=20230425&stockNo=2330');
const data = await res.json()
console.log(data)
