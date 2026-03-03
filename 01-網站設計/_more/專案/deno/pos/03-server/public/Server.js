Server = {
}

Server.uploadOrders = async function() {
    let orders = []
    for (let i=1; i <= Shop.orderCount; i++) {
      let order = await Shop.getOrder(i)
      orders.push(order)
    }
    let record = {
      shop:Shop.name,
      orders:orders
    }
    let r = await window.fetch('/order/upload', {
        body: JSON.stringify(record),
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        }
      })
    if (r.status == 200)
      alert("上傳完畢！")
    else
      alert("上傳失敗: 原因是 "+r.statusText)
}
