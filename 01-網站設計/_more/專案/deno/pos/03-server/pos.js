import { posDb } from './posDb.js'
import { getPost } from './util.js'

export const pos = {}

posDb.open()

pos.orderUpload = async function (ctx) {
    let r = await getPost(ctx)
    if (r != null) {
        for (let order of r.orders) {
            console.log('order=', order)
            order.shop = r.shop
            posDb.saveOrder(order)
        }
        ctx.response.body = "OK"
    }
}

pos.orderList = async function (ctx) {
    ctx.response.body = posDb.listOrder("")
}
