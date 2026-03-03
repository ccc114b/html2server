Server = {
}

Server.uploadOrders = async function() {
    orders = []
    for (let i=1; i <= Shop.orderCount; i++) {
      let order = await Shop.getOrder(i)
      orders.push(order)
    }
    console.log('orders=', orders)
    let r = await window.fetch('/order/upload', {
        body: JSON.stringify(orders),
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        }
      })
    return r.status == 200
}