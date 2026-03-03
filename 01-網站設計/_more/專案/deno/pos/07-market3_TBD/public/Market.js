const Market = {}

Market.html = `
<h1>賣場商家</h1>

<div id="body" class="book">

</div>
`

Market.start = async function () {
  Ui.show(Market.html)
  await Market.list()
}

Market.list = async function() {
    let shops = await Server.shopList()
    console.log('shops=', shops)
    let list = []
    for (shop of shops) {
        list.push(`<li><a href="/#shop/${shop.shop}">${shop.shop}</a></li>`)
    }
    Ui.id('body').innerHTML = `<ul>${list.join('\n')}</ul>`
}
