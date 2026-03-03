const res = await fetch('https://www.twse.com.tw/exchangeReport/STOCK_DAY?response=json&date=20230425&stockNo=2330');
const data = await res.json()
// console.log(data)

function nocamma(str) { return str.replaceAll(',', '') }

console.log("日期, 成交股數, 成交金額, 開盤價, 最高價, 最低價, 收盤價, 漲跌價差, 成交筆數")

for (let r of data.data) {
    console.log(`${r[0]},${nocamma(r[1])},${nocamma(r[2])},${r[3]},${r[4]},${r[5]},${r[6]},${r[7]},${nocamma(r[8])}`)
}
